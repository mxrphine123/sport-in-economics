(function () {
  "use strict";

  let allBases = [];
  let filteredBases = [];
  let map;
  let markersLayer;
  let heatLayer;
  let heatmapVisible = false;
  let selectedBaseId = null;

  // ======================== INIT ========================
  async function init() {
    if (typeof BASES_DATA !== "undefined") {
      allBases = BASES_DATA;
    } else {
      try {
        const res = await fetch("./bases.json");
        allBases = await res.json();
      } catch {
        allBases = [];
      }
    }

    filteredBases = [...allBases];

    initMap();
    populateFilters();
    renderBaseList();
    renderMarkers();
    updateHeaderStats(allBases);
    renderStats();
    initEvents();
  }

  // ======================== MAP ========================
  function initMap() {
    map = L.map("map", {
      center: [30, 20],
      zoom: 3,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: true,
      attributionControl: true,
      worldCopyJump: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/" target="_blank" rel="noopener noreferrer">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    // Heat layer (hidden by default)
    const heatPoints = allBases.map(function (b) {
      return [b.lat, b.lng, 0.7];
    });
    heatLayer = L.heatLayer(heatPoints, {
      radius: 30,
      blur: 20,
      maxZoom: 10,
      max: 1.0,
      gradient: {
        0.2: "#1a1a6e",
        0.4: "#c23b3b",
        0.6: "#e8a547",
        0.8: "#e8c547",
        1.0: "#ffffff",
      },
    });
  }

  function getAffiliationClass(affiliation) {
    if (affiliation === "US/NATO") return "us-nato";
    if (affiliation === "NATO") return "nato";
    return "us";
  }

  function createMarkerIcon(affiliation) {
    var cls = getAffiliationClass(affiliation);
    return L.divIcon({
      className: "custom-marker",
      html: '<div class="marker-icon ' + cls + '"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
  }

  function formatPersonnel(num) {
    if (!num || num === 0) return "Classified";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(num);
  }

  function createPopupContent(base) {
    var affCls = getAffiliationClass(base.affiliation);
    var html =
      '<div class="popup-content">' +
      '<div class="popup-header">' +
      '<span class="popup-affiliation ' + affCls + '">' + base.affiliation + "</span>" +
      "<div>" +
      '<div class="popup-title">' + escapeHtml(base.name) + "</div>" +
      '<div class="popup-country">' + escapeHtml(base.country) + "</div>" +
      "</div></div>" +
      '<div class="popup-details">' +
      '<span class="popup-label">Type</span><span class="popup-value">' + escapeHtml(base.type) + "</span>" +
      '<span class="popup-label">Branch</span><span class="popup-value">' + escapeHtml(base.branch) + "</span>" +
      '<span class="popup-label">Personnel</span><span class="popup-value mono">' + formatPersonnel(base.personnel) + "</span>" +
      '<span class="popup-label">Est.</span><span class="popup-value mono">' + (base.year_established || "N/A") + "</span>" +
      '<span class="popup-label">Region</span><span class="popup-value">' + escapeHtml(base.region || "—") + "</span>" +
      '<span class="popup-label">Coords</span><span class="popup-value mono">' + base.lat.toFixed(4) + ", " + base.lng.toFixed(4) + "</span>" +
      "</div>";

    if (base.description) {
      html += '<div class="popup-desc">' + escapeHtml(base.description) + "</div>";
    }

    html += "</div>";
    return html;
  }

  function renderMarkers() {
    if (markersLayer) {
      map.removeLayer(markersLayer);
    }

    markersLayer = L.markerClusterGroup({
      maxClusterRadius: 40,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      iconCreateFunction: function (cluster) {
        var markers = cluster.getAllChildMarkers();
        var count = markers.length;
        var hasUs = false;
        var hasNato = false;

        markers.forEach(function (m) {
          if (m.options.baseAffiliation === "US") hasUs = true;
          else if (m.options.baseAffiliation === "NATO") hasNato = true;
          else {
            hasUs = true;
            hasNato = true;
          }
        });

        var cls = "marker-cluster-mixed";
        if (hasUs && !hasNato) cls = "marker-cluster-us";
        else if (hasNato && !hasUs) cls = "marker-cluster-nato";

        var size = count < 10 ? 34 : count < 50 ? 42 : count < 100 ? 50 : 58;

        return L.divIcon({
          html: "<div style=\"width:" + size + "px;height:" + size + "px\">" + count + "</div>",
          className: "marker-cluster " + cls,
          iconSize: L.point(size, size),
        });
      },
    });

    filteredBases.forEach(function (base) {
      var marker = L.marker([base.lat, base.lng], {
        icon: createMarkerIcon(base.affiliation),
        baseId: base.id,
        baseAffiliation: base.affiliation,
      });

      marker.bindPopup(createPopupContent(base), {
        maxWidth: 340,
        minWidth: 280,
        closeButton: true,
      });

      marker.on("click", function () {
        selectedBaseId = base.id;
        highlightListItem(base.id);
      });

      markersLayer.addLayer(marker);
    });

    map.addLayer(markersLayer);
  }

  // ======================== FILTERS & SEARCH ========================
  function populateFilters() {
    var types = {};
    var countries = {};
    var regions = {};

    allBases.forEach(function (b) {
      types[b.type] = true;
      countries[b.country] = true;
      if (b.region) regions[b.region] = true;
    });

    fillSelect("filterType", Object.keys(types).sort(), "All types");
    fillSelect("filterCountry", Object.keys(countries).sort(), "All countries");
    fillSelect("filterRegion", Object.keys(regions).sort(), "All regions");
  }

  function fillSelect(id, items, placeholder) {
    var el = document.getElementById(id);
    el.innerHTML = '<option value="">' + placeholder + "</option>";
    items.forEach(function (item) {
      var opt = document.createElement("option");
      opt.value = item;
      opt.textContent = item;
      el.appendChild(opt);
    });
  }

  function applyFilters() {
    var query = document.getElementById("searchInput").value.toLowerCase().trim();
    var aff = document.getElementById("filterAffiliation").value;
    var type = document.getElementById("filterType").value;
    var country = document.getElementById("filterCountry").value;
    var region = document.getElementById("filterRegion").value;

    filteredBases = allBases.filter(function (b) {
      if (query) {
        var searchStr = (b.name + " " + b.country + " " + b.type + " " + b.branch + " " + (b.description || "")).toLowerCase();
        if (searchStr.indexOf(query) === -1) return false;
      }
      if (aff && b.affiliation !== aff) return false;
      if (type && b.type !== type) return false;
      if (country && b.country !== country) return false;
      if (region && b.region !== region) return false;
      return true;
    });

    renderBaseList();
    renderMarkers();
    updateHeaderStats(filteredBases);

    document.getElementById("baseCountLabel").textContent =
      filteredBases.length + " of " + allBases.length + " bases shown";
  }

  // ======================== BASE LIST ========================
  function renderBaseList() {
    var container = document.getElementById("baseList");
    container.innerHTML = "";

    var fragment = document.createDocumentFragment();

    filteredBases.forEach(function (base) {
      var div = document.createElement("div");
      div.className = "base-item";
      div.dataset.id = base.id;

      if (base.id === selectedBaseId) {
        div.classList.add("selected");
      }

      var affCls = getAffiliationClass(base.affiliation);

      div.innerHTML =
        '<div class="base-marker-dot ' + affCls + '"></div>' +
        '<div class="base-info">' +
        '<div class="base-name">' + escapeHtml(base.name) + "</div>" +
        '<div class="base-meta">' + escapeHtml(base.country) + " · " + escapeHtml(base.branch) + "</div>" +
        '<span class="base-type-badge">' + escapeHtml(base.type) + "</span>" +
        "</div>";

      div.addEventListener("click", function () {
        flyToBase(base);
      });

      fragment.appendChild(div);
    });

    container.appendChild(fragment);

    document.getElementById("baseCountLabel").textContent =
      filteredBases.length + " of " + allBases.length + " bases shown";
  }

  function flyToBase(base) {
    selectedBaseId = base.id;
    highlightListItem(base.id);

    map.flyTo([base.lat, base.lng], 12, { duration: 1.2 });

    setTimeout(function () {
      markersLayer.eachLayer(function (layer) {
        if (layer.options.baseId === base.id) {
          layer.openPopup();
        }
      });
    }, 1300);

    // Close mobile sidebar
    document.getElementById("sidebar").classList.remove("open");
  }

  function highlightListItem(id) {
    document.querySelectorAll(".base-item").forEach(function (el) {
      el.classList.toggle("selected", parseInt(el.dataset.id) === id);
    });
  }

  // ======================== STATS ========================
  function updateHeaderStats(bases) {
    var us = 0;
    var nato = 0;
    var countriesSet = {};

    bases.forEach(function (b) {
      if (b.affiliation === "US") us++;
      else if (b.affiliation === "NATO") nato++;
      else {
        us++;
        nato++;
      }
      countriesSet[b.country] = true;
    });

    document.getElementById("totalCount").textContent = bases.length;
    document.getElementById("usCount").textContent = us;
    document.getElementById("natoCount").textContent = nato;
    document.getElementById("countryCount").textContent = Object.keys(countriesSet).length;
    document.getElementById("infoTotal").textContent = allBases.length;
    document.getElementById("infoCountries").textContent = Object.keys(countriesSet).length;
  }

  function renderStats() {
    renderOverviewCards();
    renderRegionChart();
    renderTypeChart();
    renderCountryBars();
  }

  function renderOverviewCards() {
    var totalPersonnel = 0;
    var typeCounts = {};

    allBases.forEach(function (b) {
      totalPersonnel += b.personnel || 0;
      typeCounts[b.type] = (typeCounts[b.type] || 0) + 1;
    });

    var topType = Object.keys(typeCounts).sort(function (a, b) {
      return typeCounts[b] - typeCounts[a];
    })[0];

    var cards = [
      { label: "Total Bases", value: allBases.length },
      { label: "Host Countries", value: new Set(allBases.map(function (b) { return b.country; })).size },
      { label: "Est. Personnel", value: formatPersonnel(totalPersonnel) },
      { label: "Most Common Type", value: topType },
    ];

    var grid = document.getElementById("overviewGrid");
    grid.innerHTML = "";
    cards.forEach(function (c) {
      var div = document.createElement("div");
      div.className = "stat-card";
      div.innerHTML =
        '<div class="stat-card-label">' + c.label + "</div>" +
        '<div class="stat-card-value">' + c.value + "</div>";
      grid.appendChild(div);
    });
  }

  function renderRegionChart() {
    var regionCounts = {};
    allBases.forEach(function (b) {
      var r = b.region || "Other";
      regionCounts[r] = (regionCounts[r] || 0) + 1;
    });

    var sorted = Object.entries(regionCounts).sort(function (a, b) {
      return b[1] - a[1];
    });
    var labels = sorted.map(function (e) { return e[0]; });
    var data = sorted.map(function (e) { return e[1]; });

    var ctx = document.getElementById("regionChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#c23b3b", "#2b7ab5", "#e8a547", "#9b59b6",
              "#3ba55c", "#e8c547", "#5dade2", "#aaaaaa",
              "#e67e22", "#1abc9c",
            ],
            borderColor: "#111820",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "50%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#7b8a9e",
              font: { size: 11, family: "Inter" },
              padding: 12,
              boxWidth: 12,
            },
          },
          tooltip: {
            backgroundColor: "#1e2836",
            titleColor: "#d8dee8",
            bodyColor: "#7b8a9e",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
            cornerRadius: 6,
            padding: 10,
          },
        },
      },
    });
  }

  function renderTypeChart() {
    var typeCounts = {};
    allBases.forEach(function (b) {
      typeCounts[b.type] = (typeCounts[b.type] || 0) + 1;
    });

    var sorted = Object.entries(typeCounts).sort(function (a, b) {
      return b[1] - a[1];
    });
    var labels = sorted.map(function (e) { return e[0]; });
    var data = sorted.map(function (e) { return e[1]; });

    var colors = [
      "#c23b3b", "#2b7ab5", "#e8a547", "#9b59b6",
      "#3ba55c", "#e8c547", "#5dade2", "#e67e22",
      "#1abc9c", "#aaaaaa", "#d35400", "#8e44ad", "#7f8c8d",
    ];

    var ctx = document.getElementById("typeChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors.slice(0, labels.length),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 4,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1e2836",
            titleColor: "#d8dee8",
            bodyColor: "#7b8a9e",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
            cornerRadius: 6,
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: { color: "#7b8a9e", font: { size: 11, family: "JetBrains Mono" } },
          },
          y: {
            grid: { display: false },
            ticks: { color: "#7b8a9e", font: { size: 11, family: "Inter" } },
          },
        },
      },
    });
  }

  function renderCountryBars() {
    var countryCounts = {};
    allBases.forEach(function (b) {
      countryCounts[b.country] = (countryCounts[b.country] || 0) + 1;
    });

    var sorted = Object.entries(countryCounts)
      .sort(function (a, b) { return b[1] - a[1]; })
      .slice(0, 15);

    var maxVal = sorted[0][1];
    var container = document.getElementById("countryBars");
    container.innerHTML = "";

    sorted.forEach(function (entry) {
      var country = entry[0];
      var count = entry[1];
      var pct = (count / maxVal) * 100;

      // Determine affiliation mix for color
      var usCount = 0;
      var natoCount = 0;
      allBases.forEach(function (b) {
        if (b.country === country) {
          if (b.affiliation === "US" || b.affiliation === "US/NATO") usCount++;
          if (b.affiliation === "NATO" || b.affiliation === "US/NATO") natoCount++;
        }
      });

      var colorClass = "mixed";
      if (usCount > 0 && natoCount === 0) colorClass = "us";
      else if (natoCount > 0 && usCount === 0) colorClass = "nato";

      var row = document.createElement("div");
      row.className = "stat-bar-row";
      row.innerHTML =
        '<span class="stat-bar-label" title="' + escapeHtml(country) + '">' + escapeHtml(country) + "</span>" +
        '<div class="stat-bar-track"><div class="stat-bar-fill ' + colorClass + '" style="width:' + pct + '%"></div></div>' +
        '<span class="stat-bar-value">' + count + "</span>";
      container.appendChild(row);
    });
  }

  // ======================== EVENTS ========================
  function initEvents() {
    // Search
    var debounceTimer;
    document.getElementById("searchInput").addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(applyFilters, 200);
    });

    // Filters
    ["filterAffiliation", "filterType", "filterCountry", "filterRegion"].forEach(function (id) {
      document.getElementById(id).addEventListener("change", applyFilters);
    });

    // Tabs
    document.querySelectorAll(".sidebar-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".sidebar-tab").forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");

        var tabName = tab.dataset.tab;
        document.getElementById("listPanel").style.display = tabName === "list" ? "block" : "none";
        document.querySelector(".search-section").style.display = tabName === "list" ? "block" : "none";
        var statsEl = document.getElementById("statsPanel");
        statsEl.style.display = tabName === "stats" ? "block" : "none";
        if (tabName === "stats") statsEl.classList.add("active");
        else statsEl.classList.remove("active");
      });
    });

    // Heatmap toggle
    document.getElementById("heatmapToggle").addEventListener("click", function () {
      heatmapVisible = !heatmapVisible;
      this.classList.toggle("active", heatmapVisible);

      if (heatmapVisible) {
        map.addLayer(heatLayer);
      } else {
        map.removeLayer(heatLayer);
      }
    });

    // Mobile sidebar toggle
    var sidebarEl = document.getElementById("sidebar");
    document.getElementById("mobileToggle").addEventListener("click", function () {
      sidebarEl.classList.toggle("open");
    });

    var sidebarToggleBtn = document.getElementById("sidebarToggle");
    if (sidebarToggleBtn) {
      sidebarToggleBtn.addEventListener("click", function () {
        sidebarEl.classList.toggle("open");
      });
    }
  }

  // ======================== UTILS ========================
  function escapeHtml(str) {
    if (!str) return "";
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ======================== START ========================
  document.addEventListener("DOMContentLoaded", init);
})();
