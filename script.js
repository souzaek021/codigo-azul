document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const menu = document.getElementById("menu");
    const startButton = document.getElementById("startButton");
    const impactButton = document.getElementById("impactButton");
    const impactBox = document.getElementById("impactBox");
    const impactText = document.getElementById("impactText");
    const pathSteps = document.querySelectorAll(".path-step");
    const pathInfo = document.getElementById("pathInfo");
    const cards = document.querySelectorAll("[data-card]");

    if (menuButton && menu) {
        menuButton.addEventListener("click", function () {
            const aberto = menu.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", aberto ? "true" : "false");
            menuButton.textContent = aberto ? "FECHAR" : "MENU";
        });
    }

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (menu) menu.classList.remove("open");
            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "MENU";
            }
        });
    });

    function atualizarHeader() {
        if (header) {
            document.body.classList.toggle("scrolled", window.scrollY > 50);
        }
    }

    window.addEventListener("scroll", atualizarHeader);
    atualizarHeader();

    if (startButton) {
        startButton.addEventListener("click", function () {
            const destino = document.getElementById("ods14");
            if (destino) destino.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    cards.forEach(function (card) {
        const button = card.querySelector(".card-button");
        if (!button) return;

        button.addEventListener("click", function () {
            const estavaAberto = card.classList.contains("selected");

            cards.forEach(function (outro) {
                outro.classList.remove("selected");
                const outroButton = outro.querySelector(".card-button");
                if (outroButton) outroButton.textContent = "SAIBA MAIS";
            });

            if (!estavaAberto) {
                card.classList.add("selected");
                button.textContent = "OCULTAR";
            }
        });
    });

    if (impactButton && impactBox && impactText) {
        impactButton.addEventListener("click", function () {
            const ativo = impactBox.classList.toggle("active");
            if (ativo) {
                impactText.textContent = "Quando chove, a água pode carregar resíduos das ruas para os bueiros. Esses resíduos podem chegar aos córregos e rios e contribuir para a poluição dos ambientes aquáticos.";
                impactButton.textContent = "OCULTAR EXPLICAÇÃO";
            } else {
                impactText.textContent = "O lixo jogado longe de um rio também pode chegar até ele.";
                impactButton.textContent = "ENTENDER O IMPACTO";
            }
        });
    }

    const pathData = [
        { title: "Pessoa", text: "Tudo começa quando uma pessoa descarta um resíduo de maneira incorreta." },
        { title: "Rua", text: "O resíduo permanece na rua e pode ser transportado pela água da chuva." },
        { title: "Bueiro", text: "A água da chuva pode levar o resíduo para os sistemas de drenagem." },
        { title: "Rio", text: "O resíduo pode alcançar córregos e rios e contribuir para a poluição da água." },
        { title: "Mar", text: "Os rios podem transportar resíduos até regiões costeiras e ambientes marinhos." },
        { title: "Ecossistema", text: "Animais, plantas e outros organismos podem ser afetados pela presença desses resíduos." }
    ];

    pathSteps.forEach(function (step) {
        step.addEventListener("click", function () {
            const index = Number(step.dataset.step);
            if (!pathData[index] || !pathInfo) return;

            pathSteps.forEach(function (item) { item.classList.remove("active"); });
            step.classList.add("active");

            pathInfo.innerHTML = "<span>ETAPA " + String(index + 1).padStart(2, "0") + "</span><h3>" + pathData[index].title + "</h3><p>" + pathData[index].text + "</p>";
        });
    });

    const sections = document.querySelectorAll(".section");

    if ("IntersectionObserver" in window) {
        sections.forEach(function (section) { section.classList.add("reveal"); });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) entry.target.classList.add("visible");
            });
        }, { threshold: 0.15 });

        sections.forEach(function (section) { observer.observe(section); });
    } else {
        sections.forEach(function (section) { section.classList.add("visible"); });
    }
});
