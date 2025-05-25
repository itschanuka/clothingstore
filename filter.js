// filter.js

document.addEventListener('DOMContentLoaded', function() {
    const priceFilter = document.getElementById('price-filter');
    const bestSellerFilter = document.getElementById('best-seller-filter');
    const productCards = document.querySelectorAll('.product-card');

    // Handle price filter
    priceFilter.addEventListener('change', function() {
        const selectedPrice = priceFilter.value;

        productCards.forEach(card => {
            const price = parseFloat(card.getAttribute('data-price'));
            if (selectedPrice === 'low-high') {
                card.style.order = price;
            } else if (selectedPrice === 'high-low') {
                card.style.order = -price;
            } else {
                card.style.order = 0;  // Default
            }
        });
    });

    // Handle best-selling filter (you can implement other sorting logic here)
    bestSellerFilter.addEventListener('change', function() {
        const selectedSort = bestSellerFilter.value;

        // For now, we will just log the selection
        console.log(`Sort by: ${selectedSort}`);
        // Here you would implement the logic for best-selling, rating, etc.
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Conversion rates for each currency
    const conversionRates = {
        'usd': 1,        // Base rate (assuming all prices are in USD)
        'eur': 0.90,     // Example conversion rate for EUR
        'lkr': 320       // Example conversion rate for LKR
    };

    // Set initial base price data attributes for all product price elements
    const priceElements = document.querySelectorAll('.product-card .price');
    priceElements.forEach(priceElement => {
        // Extract the base price from the text content
        const currentPrice = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ""));
        if (!isNaN(currentPrice)) {
            // Save the original base price in a data attribute for future conversions
            priceElement.dataset.basePrice = currentPrice;
        }
    });

    // Get the currency selector dropdown
    const currencySelector = document.querySelector('.currency-selector');
    if (currencySelector) {
        // Add an event listener to handle currency change
        currencySelector.addEventListener('change', handleCurrencyChange);
    }

    // Function to handle currency changes
    function handleCurrencyChange() {
        // Get the selected currency value
        const selectedCurrency = currencySelector.value;

        // Update the displayed price for each product based on the selected currency
        priceElements.forEach(priceElement => {
            const basePrice = parseFloat(priceElement.dataset.basePrice);
            if (!isNaN(basePrice)) {
                // Calculate the new price based on the conversion rate
                const newPrice = basePrice * conversionRates[selectedCurrency];
                // Update the text content of the price element with the new formatted price
                priceElement.textContent = formatCurrency(newPrice, selectedCurrency);
            }
        });
    }

    // Function to format the price based on the selected currency
    function formatCurrency(amount, currency) {
        let currencySymbol = '';
        switch (currency) {
            case 'usd':
                currencySymbol = '$';
                break;
            case 'eur':
                currencySymbol = '€';
                break;
            case 'lkr':
                currencySymbol = 'Rs';
                break;
        }
        return `${currencySymbol}${amount.toFixed(2)}`;
    }
});
