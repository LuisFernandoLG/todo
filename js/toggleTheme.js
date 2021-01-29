const toggleThemeBtn = document.querySelector(".header__toggleTheme");
const background = document.body;

toggleThemeBtn.addEventListener("click", function () {
    let rootStyles = document.documentElement;

    if (this.className.includes("moon")) {
        rootStyles.style.setProperty("--background-color", "hsl(233, 31%, 6%)");
        rootStyles.style.setProperty("--card-color", "hsl(235, 24%, 19%)");
        rootStyles.style.setProperty("--letter-color", "hsl(234, 39%, 85%)");
        rootStyles.style.setProperty("--letter-color-light", "hsl(234, 11%, 52%)");
        background.style.background =
            ' var(--background-color) url("../images/bg-desktop-light.jpg") no-repeat';
        background.style.backgroundPosition = "top";

        if (window.screen.width <= 800) {
            background.style.background =
                ' var(--background-color) url("../images/bg-mobile-light.jpg") no-repeat';
            background.style.backgroundPosition = "top";
            background.style.backgroundSize = "contain";
        }

        this.classList.remove("moon");
    } else {
        this.classList.add("moon");

        background.style.background =
            ' var(--background-color) url("../images/bg-desktop-dark.jpg") no-repeat';
        background.style.backgroundPosition = "top";
        rootStyles.style.setProperty("--background-color", "hsl(236, 33%, 92%)");
        rootStyles.style.setProperty("--card-color", "hsl(0, 0%, 98%)");
        rootStyles.style.setProperty("--letter-color", "hsl(233, 31%, 6%)");
        rootStyles.style.setProperty("--letter-color-light", "hsl(236, 9%, 61%)");

        
        if (window.screen.width <= 800) {
            background.style.background =
                ' var(--background-color) url("../images/bg-mobile-dark.jpg") no-repeat';
            background.style.backgroundPosition = "top";
            
            background.style.backgroundSize = "contain";
        }

    }
});
