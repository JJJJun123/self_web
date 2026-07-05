// 页面交互脚本：入场动画、滚动显现、数字滚动、导航高亮
// 无任何外部依赖，纯原生实现

// 是否用户偏好减少动效
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// ---------- 首屏入场：加载后给 .reveal 元素加 visible ----------
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".reveal").forEach((el) => {
    // 稍延迟一帧，保证过渡动画触发
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

// ---------- 数字滚动：首屏台账数字从 0 滚到目标值 ----------
// 输入：元素上的 data-count 目标数值；输出：约 1.2 秒内滚动到位
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  if (reduceMotion) {
    el.textContent = target;
    return;
  }
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    // 缓出曲线，结尾减速
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const figureObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        figureObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll(".figure b[data-count]")
  .forEach((el) => figureObserver.observe(el));

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
