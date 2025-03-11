
const bmiForm = document.getElementById('bmiForm');
const painoInput = document.getElementById('paino');
const pituusInput = document.getElementById('pituus');
const bmiValueElement = document.getElementById('bmiValue');
const bmiAnalysisElement = document.getElementById('bmiAnalysis');

const bmiTexts = {
    low: 'Paino on alhainen joilla on vaaransa terveydelle' ,
    normal: 'Paino on normaali',
    high: 'Paino on korkea joilla on vaaransa terveydelle'
};

bmiForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const weight = parseFloat(painoInput.value);
    const height = parseFloat(pituusInput.value) / 100;
    if (!weight || !height) return;
    
    const bmi = (weight / (height ** 2)).toFixed(1);
    bmiValueElement.textContent = bmi;
    
    if (bmi < 18.5) {
        bmiAnalysisElement.textContent = bmiTexts.low;
    } else if (bmi > 25) {
        bmiAnalysisElement.textContent = bmiTexts.high;
    } else {
        bmiAnalysisElement.textContent = bmiTexts.normal;
    }
});
