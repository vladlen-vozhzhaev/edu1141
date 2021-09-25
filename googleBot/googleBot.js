// ==UserScript==
// @name         GoogleBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let sites = {
    "crushdrummers.ru": ["Барабанное шоу", "Заказать барабанное шоу в москве crushDrummers", "Барабанщики на корпоратив"],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Как звучит гобой","Флейта","Скрипка","Гобой","Фагот","Тромбон","Кларнет"]
}
let btnK = document.getElementsByName("btnK")[1];
// Если(if) кнопка(btnK) не(!) является(=) неопределенной(undefined), (т.е. кнопка сущетствует)
if (btnK != undefined){ // Если находимся на главной странице гугл
    let site = Object.keys(sites)[getIntRandom(0, Object.keys(sites).length)];
    let words = sites[site];
    let word = words[getIntRandom(0, words.length)];
    document.getElementsByName("q")[0].value = word;
    document.cookie = "site="+site;
    btnK.click();
}else if(location.hostname == 'www.google.com'){ // Если не на главной (страница поисковой выдачи)
    let site = getCookie("site");
    let links = document.links;
    let pnnext = document.getElementById("pnnext");
    let goToTheNextPage = true;
    let pageNumber = +document.getElementsByClassName("YyVfkd")[0].innerText;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
            goToTheNextPage = false;
            setTimeout(function(){link.click()}, 3000);
            break;
        }
    }
    if(goToTheNextPage && pageNumber<10) setTimeout(function(){pnnext.click();}, 1500);
    else if(goToTheNextPage) location.href = "https://www.google.com/";
}else{ // Находимся не на гугле
    let links = document.links;
    setInterval(function(){
        if(getIntRandom(0,100)<30){
            location.href = "https://www.google.com/";
        }else{
            let index = getIntRandom(0, links.length);
            let link = links[index];
            if(link.href.indexOf(location.hostname) != -1){
                link.click();
            }
        }
    }, 3000);
}

function getIntRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
