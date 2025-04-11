(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();const a="https://fakestoreapi.com";let d=[];const t={productsContainer:document.querySelector(".products"),productDetailsContainer:document.querySelector(".product-details"),loadingElement:document.querySelector(".loading")};async function l(){try{t.loadingElement.classList.remove("hidden"),t.productsContainer.classList.add("hidden"),t.productDetailsContainer.classList.add("hidden"),d=await(await fetch(`${a}/products`)).json(),u(d),t.loadingElement.classList.add("hidden"),t.productsContainer.classList.remove("hidden")}catch(o){t.loadingElement.textContent="Ошибка загрузки",console.error("Error fetching products:",o)}}function u(o){o.forEach(s=>{const e=document.createElement("div");e.className="product-card",e.innerHTML=`
                <img src="${s.image}" alt="${s.title}" class="product-image">
                <div class="product-info">
                    <h4 class="product-title">${s.title}</h4>
                    <div class="product-price">$${s.price}</div>
                    <button class="view-details" data-id="${s.id}">Details</button>
                </div>
            `,t.productsContainer.appendChild(e)}),document.querySelectorAll(".view-details").forEach(s=>{s.addEventListener("click",e=>{const n=parseInt(e.target.getAttribute("data-id"));p(n)})})}async function p(o){try{t.loadingElement.classList.remove("hidden"),t.productsContainer.classList.add("hidden"),t.productDetailsContainer.classList.add("hidden");const e=await(await fetch(`${a}/products/${o}`)).json();t.productDetailsContainer.innerHTML=`
                <button class="back-2-products">Back</button>
                <img src="${e.image}" alt="${e.title}" class="detail-image">
                <h2 class="detail-title">${e.title}</h2>
                <div class="detail-price">$${e.price}</div>
                <span class="detail-category">${e.category}</span>
                <p class="detail-description">${e.description}</p>
                <div class="rating">Rating: ${e.rating.rate} (${e.rating.count})</div>
            `,document.querySelector(".back-2-products").addEventListener("click",()=>{t.productsContainer.classList.remove("hidden"),t.productDetailsContainer.classList.add("hidden")}),t.loadingElement.classList.add("hidden"),t.productDetailsContainer.classList.remove("hidden")}catch{t.loadingElement.textContent="Ошибка загрузки",console.error("Error fetching product:",error)}}l();
