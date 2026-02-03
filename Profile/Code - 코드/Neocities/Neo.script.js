document.addEventListener("DOMContentLoaded", () => {
    const pagers = document.querySelectorAll(".table-pager[data-for]");

    pagers.forEach((pager) => {
        const tableId = pager.getAttribute("data-for");
        const table = document.getElementById(tableId);
        if (!table) {
            return;
        }

        const rows = Array.from(table.querySelectorAll("tr"));
        if (rows.length <= 1) {
            pager.style.display = "none";
            return;
        }

        const pageSizeAttr = table.getAttribute("data-page-size");
        const pageSize = Math.max(1, parseInt(pageSizeAttr || "3", 10));
        const headerRow = rows[0];
        const bodyRows = rows.slice(1);
        const totalPages = Math.max(1, Math.ceil(bodyRows.length / pageSize));

        const prevBtn = pager.querySelector('[data-action="prev"]');
        const nextBtn = pager.querySelector('[data-action="next"]');
        const statusEl = pager.querySelector(".pager-status");

        let currentPage = 1;

        const render = () => {
            bodyRows.forEach((row, index) => {
                const pageIndex = Math.floor(index / pageSize) + 1;
                row.style.display = pageIndex === currentPage ? "table-row" : "none";
            });

            statusEl.textContent = `Page ${currentPage} / ${totalPages}`;
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
            headerRow.style.display = "table-row";
        };

        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage -= 1;
                render();
            }
        });

        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage += 1;
                render();
            }
        });

        render();
    });
});
