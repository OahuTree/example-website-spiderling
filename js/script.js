document.addEventListener('DOMContentLoaded', function() {
    console.log('Test page loaded successfully.');

    // Button click demo
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const name = document.getElementById('nameInput').value;
            alert('Hello, ' + (name || 'Guest') + '! Form submitted (simulated).');
        });
    }

    // Dynamic table row addition demo
    const addRowBtn = document.getElementById('addRowBtn');
    const testTable = document.getElementById('testTable');
    if (addRowBtn && testTable) {
        addRowBtn.addEventListener('click', function() {
            const tbody = testTable.querySelector('tbody');
            const rowCount = tbody.rows.length + 1;
            const newRow = tbody.insertRow();
            
            const productName = `Dynamic Item ${rowCount}`;
            newRow.innerHTML = `
                <td>${rowCount}</td>
                <td>${productName}</td>
                <td>Active</td>
                <td>${new Date().toLocaleTimeString()}</td>
                <td><a href="dynamic_params.html?id=${rowCount}&name=${productName}" style="color: #0071e3;">View Details</a></td>
            `;

            // Temporary highlight
            newRow.style.backgroundColor = '#eef';
            setTimeout(() => {
                newRow.style.backgroundColor = 'transparent';
            }, 500);
        });
    }

    // Pagination Simulation
    const jumpPageBtn = document.getElementById('jumpPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const pageInput = document.getElementById('pageNumberInput');

    function updateTableContent(page) {
        page = parseInt(page);
        if (isNaN(page) || page < 1) page = 1;
        if (page > 10) page = 10;

        pageInput.value = page;
        console.log('Updating table to page:', page);

        const tbody = testTable.querySelector('tbody');
        // Visual feedback during "load"
        tbody.style.opacity = '0.3';

        setTimeout(() => {
            const id1 = (page-1)*2 + 1;
            const name1 = `Page ${page} Data A`;
            const id2 = (page-1)*2 + 2;
            const name2 = `Page ${page} Data B`;

            tbody.innerHTML = `
                <tr>
                    <td>${id1}</td>
                    <td>${name1}</td>
                    <td>Loaded</td>
                    <td>${new Date().toLocaleDateString()}</td>
                    <td><a href="dynamic_params.html?id=${id1}&name=${name1}" style="color: #0071e3;">View Details</a></td>
                </tr>
                <tr>
                    <td>${id2}</td>
                    <td>${name2}</td>
                    <td>Loaded</td>
                    <td>${new Date().toLocaleDateString()}</td>
                    <td><a href="dynamic_params.html?id=${id2}&name=${name2}" style="color: #0071e3;">View Details</a></td>
                </tr>
            `;
            tbody.style.opacity = '1';
        }, 200);
    }

    if (jumpPageBtn && pageInput) {
        jumpPageBtn.addEventListener('click', () => updateTableContent(pageInput.value));
    }

    if (nextPageBtn && pageInput) {
        nextPageBtn.addEventListener('click', () => {
            let next = parseInt(pageInput.value) + 1;
            if (next <= 10) updateTableContent(next);
        });
    }

    if (prevPageBtn && pageInput) {
        prevPageBtn.addEventListener('click', () => {
            let prev = parseInt(pageInput.value) - 1;
            if (prev >= 1) updateTableContent(prev);
        });
    }
});
