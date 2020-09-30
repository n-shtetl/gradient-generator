const gradient = document.querySelector('.gradient');

const topColor = document.querySelector('input[name="topColor"]');
const bottomColor = document.querySelector('input[name="bottomColor"]');
const currentColors = [topColor.value, bottomColor.value];

const topLabel = document.querySelector('label[for="topColor"]');
const bottomLabel = document.querySelector('label[for="bottomColor"]');

const knob = document.querySelector('.spinKnob');
const knobDial = document.querySelector('.knobDial');

let knobX = knob.getBoundingClientRect().left + 50;
let knobY = knob.getBoundingClientRect().top + 50;

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}

copyToClipboard("gay shit")

window.addEventListener('resize', () => {
    knobX = knob.getBoundingClientRect().left + 50;
    knobY = knob.getBoundingClientRect().top + 50;
})

topColor.addEventListener('change', e => {
gradient.style.background = `linear-gradient(180deg, ${e.target.value}, ${currentColors[1]})`
knobDial.style.background = `linear-gradient(${e.target.value}, ${currentColors[1]})`
currentColors[0] = e.target.value;
topLabel.innerHTML = `${e.target.value}`
})

bottomColor.addEventListener('change', e => {
gradient.style.background = `linear-gradient(180deg, ${currentColors[0]}, ${e.target.value})`
knobDial.style.background = `linear-gradient(${currentColors[0]}, ${e.target.value})`
currentColors[1] = e.target.value;
bottomLabel.innerHTML = `${e.target.value}`
})

knob.addEventListener('mousedown', e => {
//   console.log(e.clientX, e.clientY, knobX, knobY);
    let angle = Math.atan2(e.clientY-knobY, e.clientX-knobX) * 180/Math.PI + 90;
    console.log(angle);
    knob.style.transform = `rotate(${angle}deg)`
    console.log(currentColors);
    gradient.style.background = `linear-gradient(${angle}deg, ${currentColors[0]}, ${currentColors[1]})`
    knobDial.style.background = `linear-gradient(${angle}deg, ${currentColors[0]}, ${currentColors[1]})`
    // gradientStyle = gradientStyle.match(/linear-gradient.+?(?=\)\))/)[0].concat('))');
})

