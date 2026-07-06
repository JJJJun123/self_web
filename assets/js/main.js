// 页面交互脚本：入场动画、滚动显现、导航高亮
// 无任何外部依赖，纯原生实现

// ---------- 首屏入场：加载后给 .reveal 元素加 visible ----------
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".reveal").forEach((el) => {
    requestAnimationFrame(() => el.classList.add("visible"));
  });
});

// ---------- 滚动显现：章节进入视口时加 in-view ----------
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(".section")
  .forEach((sec) => sectionObserver.observe(sec));

// ---------- 导航高亮：当前所在章节对应的导航项加 active ----------
const navLinks = document.querySelectorAll(".rail-nav a");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`,
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);
document
  .querySelectorAll("section[id]")
  .forEach((sec) => navObserver.observe(sec));
