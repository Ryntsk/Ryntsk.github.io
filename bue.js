const symbols = [
        { proName: "NASDAQ:MSFT", title: "Microsoft" },
        { proName: "NASDAQ:GOOGL", title: "Alphabet" },
        { proName: "NASDAQ:NVDA", title: "NVIDIA" },
        { proName: "US10Y", title: "US 10Y Yield" },
        { proName: "US05Y", title: "US 5Y Yield" },
        { proName: "AMEX:SPY", title: "S&P 500 ETF" },
        { proName: "NASDAQ:QQQ", title: "QQQ Trust" },
        { proName: "Gold", title: "Gold" },
        { proName: "UKOIL", title: "Brent Oil" },
        { proName: "NGAS", title: "Natural Gas" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" }
    ];

    const config = {
        symbols: symbols,
        showSymbolLogo: false,
        colorTheme: "dark",
        isTransparent: true,
        displayMode: "adaptive",
        locale: "ru"
    };

    function loadTicker() {
        const container = document.getElementById("tv-ticker");
        if (!container) return;

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify(config);

        container.innerHTML = "";
        container.appendChild(script);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadTicker);
    } else {
        loadTicker();
    }
