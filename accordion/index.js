"use strict";

const config = [
    {
        id: 1,
        summary: "accordion 1",
        detail: "this is accordion 1",
    },
    {
        id: 2,
        summary: "accordion 2",
        detail: "this is accordion 2",
    },
    {
        id: 3,
        summary: "accordion 3",
        detail: "this is accordion 3",
    },
    {
        id: 4,
        summary: "accordion 4",
        detail: "this is accordion 4",
    },
    {
        id: 5,
        summary: "accordion 5",
        detail: "this is accordion 5",
    },
];

document.addEventListener("DOMContentLoaded", (e) => {
    const root = document.getElementById("root");
    let expandedId = config[0]?.id?.toString();
    config.forEach((acc) => {
        const accordionItem = document.createElement("div");
        const detailId = `detail-${acc.id}`;
        accordionItem.innerHTML = `<div id=${acc.id} class='summary'>${acc.summary}</div>
        <div id=${detailId} class='detail'>${acc.detail}</div>`;
        root.appendChild(accordionItem);
    });
    document.getElementById(expandedId).classList.add("isExpanded-summary");
    document
        .getElementById(`detail-${expandedId}`)
        .classList.add("isExpanded-detail");

    root.addEventListener("click", (e) => {
        const target = e.target;
        console.log(e.target.classList);
        if (target.tagName === "DIV" && Array.from(target.classList).includes("summary")) {
            toggleAccordion(target.id);
        }
    });

    const toggleAccordion = (id) => {
        if (id === expandedId) {
            const expandedSummary = document.getElementById(id);
            expandedSummary.classList.remove("isExpanded-summary");
            const expandedDetail=document.getElementById(`detail-${id}`);
            expandedDetail.classList.remove("isExpanded-detail");
            expandedId=null
        } else {
            if(expandedId){
                const prevExpandedSummary = document.getElementById(expandedId);
                prevExpandedSummary.classList.remove("isExpanded-summary");
                const prevExpandedDetail = document.getElementById(
                    `detail-${expandedId}`
                );
                prevExpandedDetail.classList.remove("isExpanded-detail");
            }
            console.log('id is ',id);
            const newlyExpandedSummary = document.getElementById(id);
            newlyExpandedSummary.classList.add("isExpanded-summary");
            const newlyExpandedDetail = document.getElementById(`detail-${id}`);
            newlyExpandedDetail.classList.add("isExpanded-detail");
            expandedId=id;
        }
    };
});
