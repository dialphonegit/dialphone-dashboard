const chartFont = "'Inter', system-ui, sans-serif";
const blue = "#2563eb";
const green = "#16b978";
const red = "#ff3b3b";
const purple = "#8b5cf6";
const orange = "#f59e0b";
const teal = "#14b8a6";

Chart.defaults.font.family = chartFont;
Chart.defaults.font.size = 11;
Chart.defaults.color = "#63708a";
Chart.defaults.plugins.legend.display = false;
Chart.defaults.plugins.tooltip.backgroundColor = "#0f1b3d";
Chart.defaults.plugins.tooltip.padding = 9;
Chart.defaults.plugins.tooltip.cornerRadius = 6;

const makeGradient = (ctx, color) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 130);
  gradient.addColorStop(0, `${color}33`);
  gradient.addColorStop(1, `${color}00`);
  return gradient;
};

const sparkLine = (id, data, color) => {
  const canvas = document.getElementById(id);
  if (!canvas) return;

  new Chart(canvas, {
    type: "line",
    data: {
      labels: data.map((_, index) => index + 1),
      datasets: [
        {
          data,
          borderColor: color,
          backgroundColor: makeGradient(canvas.getContext("2d"), color),
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
          tension: 0.42,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: "easeOutQuart" },
      scales: {
        x: { display: false },
        y: { display: false },
      },
      plugins: {
        tooltip: { enabled: false },
      },
    },
  });
};

sparkLine("totalCallsSpark", [9, 12, 10, 14, 13, 15, 18, 21, 23, 18, 13, 17, 20, 14, 10, 13, 17], blue);
sparkLine("answeredSpark", [8, 11, 7, 12, 8, 13, 18, 22, 19, 14, 20, 23, 15, 21, 17, 10, 14], green);
sparkLine("missedSpark", [10, 9, 16, 12, 8, 15, 10, 7, 5, 8, 14, 9, 6, 10], red);
sparkLine("avgTimeSpark", [9, 11, 8, 13, 12, 12, 14, 14, 19, 14, 12, 15, 18, 12, 8, 12], purple);

const trendCanvas = document.getElementById("callTrendChart");
if (trendCanvas) {
  new Chart(trendCanvas, {
    type: "line",
    data: {
      labels: ["12 AM", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12 PM", "01", "02", "03", "04", "05", "06", "07", "08", "09"],
      datasets: [
        {
          label: "Inbound Calls",
          data: [4, 7, 11, 14, 10, 9, 11, 16, 17, 14, 16, 20, 23, 24, 18, 17, 17, 21, 25, 27, 25, 19],
          borderColor: green,
          backgroundColor: `${green}16`,
          borderWidth: 2,
          fill: false,
          pointRadius: 2,
          pointHoverRadius: 4,
          tension: 0.38,
        },
        {
          label: "Outbound Calls",
          data: [2, 3, 5, 7, 5, 4, 6, 10, 12, 8, 9, 13, 15, 16, 11, 10, 11, 14, 16, 18, 16, 11],
          borderColor: blue,
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 4,
          tension: 0.38,
        },
        {
          label: "Missed Calls",
          data: [1, 1, 2, 3, 2, 2, 2, 3, 3, 3, 4, 3, 4, 4, 5, 3, 3, 4, 5, 5, 4, 3],
          borderColor: red,
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 4,
          tension: 0.38,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 8, font: { size: 10 } },
        },
        y: {
          beginAtZero: true,
          suggestedMax: 30,
          grid: { color: "#e4e9f1", borderDash: [4, 4] },
          ticks: { font: { size: 10 } },
        },
      },
    },
  });
}

const heatmap = document.getElementById("heatmap");
if (heatmap) {
  const heatValues = [
    1, 2, 1, 2, 3, 2, 3, 5, 4, 6, 7, 8, 7, 5, 4, 3,
    1, 1, 2, 2, 2, 3, 4, 5, 6, 6, 8, 9, 8, 6, 4, 2,
    1, 2, 2, 3, 4, 7, 3, 5, 6, 8, 9, 10, 9, 7, 5, 3,
    1, 1, 2, 3, 3, 4, 4, 5, 7, 7, 10, 9, 8, 5, 4, 3,
    1, 2, 2, 2, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 3, 2,
    0, 1, 1, 1, 2, 2, 3, 4, 5, 5, 6, 5, 4, 3, 2, 1,
    0, 1, 1, 1, 1, 2, 2, 3, 4, 5, 5, 4, 3, 2, 2, 1,
  ];

  heatValues.forEach((value) => {
    const cell = document.createElement("span");
    cell.className = "heat-cell";
    cell.style.backgroundColor = `rgba(37, 99, 235, ${0.08 + value * 0.075})`;
    cell.title = `${value * 4} calls`;
    heatmap.appendChild(cell);
  });
}

const categories = [
  "Call Analytics",
  "Agent Monitoring",
  "AI Insights",
  "Campaign Analytics",
  "Queue Monitoring",
  "Customer Experience",
  "SLA Metrics",
  "Performance Metrics",
  "Live Monitoring",
  "AI Automation",
  "Voice Analytics",
  "Omnichannel Analytics",
  "Supervisor Tools",
  "Reporting Widgets",
  "System Health",
  "Real-time Metrics",
];

const widgets = [
  { name: "Live Calls Monitor", category: "Live Monitoring", icon: "fa-phone-volume", preview: "lines", description: "Track active conversations, caller direction, and live call handling in one view." },
  { name: "Active Agents", category: "Agent Monitoring", icon: "fa-headset", preview: "kpis", description: "See available, busy, wrap-up, and offline agent counts across teams." },
  { name: "Agent Status Timeline", category: "Agent Monitoring", icon: "fa-timeline", preview: "bars", description: "Visualize agent state changes across login, ready, break, and call time." },
  { name: "Call Queue Status", category: "Queue Monitoring", icon: "fa-people-arrows", preview: "bars", description: "Monitor queue depth, oldest waiting call, and queue movement in real time." },
  { name: "Average Wait Time", category: "Queue Monitoring", icon: "fa-hourglass-half", preview: "ring", description: "Show average customer wait time with queue-level threshold indicators." },
  { name: "Missed Calls", category: "Call Analytics", icon: "fa-phone-slash", preview: "chart", description: "Surface missed call volume, trend, and callback urgency by time period." },
  { name: "Answer Rate", category: "Performance Metrics", icon: "fa-square-phone", preview: "ring", description: "Measure answered calls as a percentage of total inbound attempts." },
  { name: "First Call Resolution", category: "Customer Experience", icon: "fa-circle-check", preview: "ring", description: "Track issues resolved during the first customer interaction." },
  { name: "AI Sentiment Analysis", category: "AI Insights", icon: "fa-face-smile", preview: "chart", description: "Classify live and historical conversations by positive, neutral, and negative tone." },
  { name: "AI Call Summary", category: "AI Insights", icon: "fa-wand-magic-sparkles", preview: "bars", description: "Preview concise AI-generated summaries, intents, and next steps after calls." },
  { name: "Voice Emotion Detection", category: "Voice Analytics", icon: "fa-microphone-lines", preview: "lines", description: "Identify emotion shifts such as calm, frustrated, excited, or confused." },
  { name: "Call Recording Insights", category: "Voice Analytics", icon: "fa-record-vinyl", preview: "bars", description: "Analyze recordings for keywords, compliance checks, silence, and talk ratio." },
  { name: "Live Supervisor Listen", category: "Supervisor Tools", icon: "fa-headphones", preview: "lines", description: "Give supervisors a quick view of calls available for live listening." },
  { name: "Barge-In Monitoring", category: "Supervisor Tools", icon: "fa-person-circle-exclamation", preview: "kpis", description: "Highlight calls where supervisor intervention may be needed." },
  { name: "Whisper Coaching", category: "Supervisor Tools", icon: "fa-comment-dots", preview: "bars", description: "Track active coaching sessions and agents currently receiving guidance." },
  { name: "Customer Satisfaction Score", category: "Customer Experience", icon: "fa-star-half-stroke", preview: "ring", description: "Display CSAT ratings with trend movement and response count." },
  { name: "SLA Compliance", category: "SLA Metrics", icon: "fa-shield-halved", preview: "ring", description: "Measure how many interactions meet service-level targets." },
  { name: "Callback Requests", category: "Queue Monitoring", icon: "fa-phone-flip", preview: "bars", description: "Show pending, completed, and expired customer callback requests." },
  { name: "Abandoned Calls", category: "Call Analytics", icon: "fa-phone-xmark", preview: "chart", description: "Track calls abandoned before agent connection and where they drop." },
  { name: "Peak Hour Heatmap", category: "Call Analytics", icon: "fa-table-cells", preview: "heat", description: "Find traffic spikes by weekday and hour with a compact heatmap." },
  { name: "Agent Leaderboard", category: "Agent Monitoring", icon: "fa-ranking-star", preview: "bars", description: "Rank agents by answered calls, quality score, handle time, and CSAT." },
  { name: "Campaign Success Rate", category: "Campaign Analytics", icon: "fa-bullseye", preview: "ring", description: "Compare campaign performance by answer, conversion, and follow-up rate." },
  { name: "Conversion Analytics", category: "Campaign Analytics", icon: "fa-chart-line", preview: "chart", description: "Review conversion progress from call attempts to qualified outcomes." },
  { name: "Outbound Dialer Stats", category: "Campaign Analytics", icon: "fa-tower-broadcast", preview: "kpis", description: "Monitor dial attempts, connect rate, retry volume, and pacing." },
  { name: "Predictive Dialer Health", category: "Campaign Analytics", icon: "fa-heart-pulse", preview: "ring", description: "Track dialer utilization, answer prediction quality, and pacing health." },
  { name: "Omnichannel Interactions", category: "Omnichannel Analytics", icon: "fa-layer-group", preview: "chart", description: "Combine calls, chats, email, WhatsApp, and social interactions in one metric." },
  { name: "WhatsApp Conversations", category: "Omnichannel Analytics", icon: "fa-comment-sms", preview: "bars", description: "Measure WhatsApp conversation volume, response speed, and active sessions." },
  { name: "Email Ticket Analytics", category: "Omnichannel Analytics", icon: "fa-envelope-open-text", preview: "chart", description: "Track ticket backlog, first response time, and resolution rate." },
  { name: "Chat Queue", category: "Queue Monitoring", icon: "fa-comments", preview: "bars", description: "See chat waiting count, active sessions, and average first reply time." },
  { name: "AI Bot Performance", category: "AI Automation", icon: "fa-robot", preview: "kpis", description: "Track containment, handoff, fallback, and bot satisfaction metrics." },
  { name: "AI Resolution Rate", category: "AI Automation", icon: "fa-brain", preview: "ring", description: "Measure how often AI resolves customer needs without human escalation." },
  { name: "Knowledge Base Usage", category: "AI Automation", icon: "fa-book-open", preview: "bars", description: "Show most used articles, search success, and agent knowledge assists." },
  { name: "CRM Activity Feed", category: "Reporting Widgets", icon: "fa-address-card", preview: "lines", description: "Display recent CRM notes, tasks, dispositions, and customer updates." },
  { name: "Escalation Monitoring", category: "Supervisor Tools", icon: "fa-arrow-trend-up", preview: "chart", description: "Watch escalated calls, escalated tickets, owner, reason, and age." },
  { name: "Fraud Detection Alerts", category: "AI Insights", icon: "fa-triangle-exclamation", preview: "kpis", description: "Flag suspicious patterns, repeated callers, or risky identity signals." },
  { name: "Geo Call Distribution", category: "Reporting Widgets", icon: "fa-map-location-dot", preview: "heat", description: "Visualize where calls originate by city, region, or territory." },
  { name: "Network/System Health", category: "System Health", icon: "fa-server", preview: "ring", description: "Show platform uptime, network latency, packet loss, and incidents." },
  { name: "SIP Trunk Status", category: "System Health", icon: "fa-diagram-project", preview: "kpis", description: "Monitor trunk availability, registration, failover, and call routing." },
  { name: "API Health", category: "System Health", icon: "fa-code-branch", preview: "bars", description: "Check API response time, error rate, throughput, and availability." },
  { name: "Database Health", category: "System Health", icon: "fa-database", preview: "ring", description: "Show query latency, connection pool usage, and replication health." },
  { name: "Real-Time Alerts", category: "Real-time Metrics", icon: "fa-bell", preview: "lines", description: "Display urgent alerts for SLA risk, outages, spikes, and supervisor actions." },
  { name: "Supervisor Notifications", category: "Supervisor Tools", icon: "fa-bell", preview: "bars", description: "Centralize coaching prompts, queue warnings, escalations, and approvals." },
  { name: "Workforce Management", category: "Performance Metrics", icon: "fa-users-gear", preview: "chart", description: "Track staffing requirements, coverage gaps, shrinkage, and occupancy." },
  { name: "Schedule Adherence", category: "Performance Metrics", icon: "fa-calendar-check", preview: "ring", description: "Compare planned shifts against actual agent activity and breaks." },
  { name: "Agent Productivity", category: "Performance Metrics", icon: "fa-gauge-high", preview: "kpis", description: "Summarize calls handled, wrap time, occupancy, and quality movement." },
  { name: "Revenue Tracking", category: "Reporting Widgets", icon: "fa-sack-dollar", preview: "chart", description: "Connect campaign outcomes to booked revenue and upsell value." },
  { name: "Billing Usage", category: "Reporting Widgets", icon: "fa-file-invoice-dollar", preview: "bars", description: "Show minutes used, included allowance, overage, and billable activity." },
  { name: "Call Cost Analytics", category: "Reporting Widgets", icon: "fa-coins", preview: "chart", description: "Break down telecom spend by route, country, queue, or campaign." },
  { name: "Regional Performance", category: "Reporting Widgets", icon: "fa-earth-americas", preview: "heat", description: "Compare service levels, conversion, and customer experience by region." },
  { name: "Executive KPI Overview", category: "Performance Metrics", icon: "fa-chart-simple", preview: "kpis", description: "Create a leadership-ready summary of revenue, service, quality, and risk." },
];

let selectedCategory = "All Widgets";
let widgetSearch = "";
const savedWidgets = new Set(JSON.parse(localStorage.getItem("ccaasSelectedWidgets") || "[]"));

if (savedWidgets.size === 0) {
  ["Live Calls Monitor", "Active Agents", "Call Queue Status", "AI Sentiment Analysis", "SLA Compliance", "Network/System Health"].forEach((name) => savedWidgets.add(name));
}

const modal = document.getElementById("customizerModal");
const openCustomizer = document.getElementById("openCustomizer");
const closeCustomizer = document.getElementById("closeCustomizer");
const widgetGrid = document.getElementById("widgetGrid");
const categoryList = document.getElementById("categoryList");
const widgetSearchInput = document.getElementById("widgetSearch");
const activeCategoryTitle = document.getElementById("activeCategoryTitle");
const widgetCountLabel = document.getElementById("widgetCountLabel");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");

const previewMarkup = (type) => {
  if (type === "chart") return "<div class='widget-preview preview-chart'><i style='height:36px'></i><i></i><i></i><i></i><i></i><i></i></div>";
  if (type === "heat") return "<div class='widget-preview preview-heat'><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>";
  if (type === "ring") return "<div class='widget-preview preview-ring'><i></i></div>";
  if (type === "kpis") return "<div class='widget-preview preview-kpis'><i></i><i></i><i></i><i></i></div>";
  if (type === "lines") return "<div class='widget-preview preview-lines'><i style='width:62%'></i><i style='width:82%'></i><i style='width:48%'></i></div>";
  return "<div class='widget-preview preview-bars'><i></i><i></i><i></i></div>";
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
};

const renderCategories = () => {
  const categoryCounts = categories.reduce((map, category) => {
    map[category] = widgets.filter((widget) => widget.category === category).length;
    return map;
  }, {});

  categoryList.innerHTML = categories
    .map(
      (category) => `
        <button class="category-pill" type="button" data-category="${category}">
          ${category}
          <span>${categoryCounts[category]}</span>
        </button>
      `
    )
    .join("");
};

const getFilteredWidgets = () => {
  const query = widgetSearch.trim().toLowerCase();
  return widgets.filter((widget) => {
    const matchesCategory = selectedCategory === "All Widgets" || widget.category === selectedCategory;
    const matchesSearch =
      !query ||
      widget.name.toLowerCase().includes(query) ||
      widget.category.toLowerCase().includes(query) ||
      widget.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
};

const renderWidgets = () => {
  const filteredWidgets = getFilteredWidgets();
  activeCategoryTitle.textContent = selectedCategory;
  widgetCountLabel.textContent = `${filteredWidgets.length} widget option${filteredWidgets.length === 1 ? "" : "s"} available`;
  emptyState.style.display = filteredWidgets.length ? "none" : "grid";

  widgetGrid.innerHTML = filteredWidgets
    .map((widget) => {
      const isSelected = savedWidgets.has(widget.name);
      return `
        <article class="widget-card">
          <div class="widget-top">
            <span class="widget-icon"><i class="fa-solid ${widget.icon}"></i></span>
            <div class="widget-title">
              <h4>${widget.name}</h4>
              <span>${widget.category}</span>
            </div>
            <label class="switch" aria-label="Toggle ${widget.name}">
              <input type="checkbox" data-widget-toggle="${widget.name}" ${isSelected ? "checked" : ""} />
              <span></span>
            </label>
          </div>
          ${previewMarkup(widget.preview)}
          <p>${widget.description}</p>
          <div class="widget-footer">
            <span class="widget-badge">${isSelected ? "Enabled" : "Available"}</span>
            <button class="add-widget-button ${isSelected ? "added" : ""}" type="button" data-widget-add="${widget.name}">
              <i class="fa-solid ${isSelected ? "fa-check" : "fa-plus"}"></i>
              ${isSelected ? "Added" : "Add to Dashboard"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
};

const updateCategoryButtons = () => {
  document.querySelectorAll(".category-pill").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === selectedCategory);
  });
};

const openModal = () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => widgetSearchInput.focus(), 120);
};

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

renderCategories();
renderWidgets();

openCustomizer?.addEventListener("click", openModal);
closeCustomizer?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest(".category-pill");
  if (categoryButton) {
    selectedCategory = categoryButton.dataset.category;
    updateCategoryButtons();
    renderWidgets();
  }

  const addButton = event.target.closest("[data-widget-add]");
  if (addButton) {
    const widgetName = addButton.dataset.widgetAdd;
    if (savedWidgets.has(widgetName)) {
      savedWidgets.delete(widgetName);
      showToast(`${widgetName} removed from dashboard`);
    } else {
      savedWidgets.add(widgetName);
      showToast(`${widgetName} added to dashboard`);
    }
    renderWidgets();
  }
});

document.addEventListener("change", (event) => {
  const toggle = event.target.closest("[data-widget-toggle]");
  if (!toggle) return;

  const widgetName = toggle.dataset.widgetToggle;
  if (toggle.checked) {
    savedWidgets.add(widgetName);
    showToast(`${widgetName} enabled`);
  } else {
    savedWidgets.delete(widgetName);
    showToast(`${widgetName} disabled`);
  }
  renderWidgets();
});

widgetSearchInput?.addEventListener("input", (event) => {
  widgetSearch = event.target.value;
  renderWidgets();
});

document.getElementById("saveWidgets")?.addEventListener("click", () => {
  localStorage.setItem("ccaasSelectedWidgets", JSON.stringify([...savedWidgets]));
  showToast(`${savedWidgets.size} dashboard widgets saved`);
  closeModal();
});

document.getElementById("resetWidgets")?.addEventListener("click", () => {
  savedWidgets.clear();
  ["Live Calls Monitor", "Active Agents", "Call Queue Status", "AI Sentiment Analysis", "SLA Compliance", "Network/System Health"].forEach((name) => savedWidgets.add(name));
  localStorage.removeItem("ccaasSelectedWidgets");
  widgetSearch = "";
  widgetSearchInput.value = "";
  selectedCategory = "All Widgets";
  updateCategoryButtons();
  renderWidgets();
  showToast("Default dashboard layout restored");
});
