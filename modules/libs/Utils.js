function label(text) {
    let field = document.createElement("span");
    field.innerHTML =text;
    return field;
}

function slider(min,max,step,val,onChange=()=>{}, hard=false) {
    let el = document.createElement("input");
    el.setAttribute("type", "range");
    el.setAttribute("min", min);
    el.setAttribute("max", max);
    el.setAttribute("step", step);
    el.setAttribute("value", val);
    let effectiveChangeFunction = ()=>{
        onChange(el);
    };
    el.onchange = effectiveChangeFunction;
    if(hard)el.onmousemove = effectiveChangeFunction;

    return el;
}


function link(text, onClick=()=>{}) {
    let el = document.createElement("a");
    el.innerHTML = text;
    el.href = "";
    el.onclick = (e)=>{
        e.preventDefault();
        onClick();
    };
    return el;
}

function int(x) { return parseInt(x); }