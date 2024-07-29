const dataTraining = [
    // [1,0,1,0],
    // [1,0,0,1],
    [1,0],
    [0,1],
]

//fungsi sigmoid
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

const solusi = [    
    -1.9449416943264184,   1.2451671357687522, -0.08788130420929699,
       0.9493132046546577,   1.3863532072091416,    1.061683557795103,
       1.4979677303413783,  0.35620718037727805,                    2,
      0.22648981408158336,   0.6658814331180448,                    2,
       1.4548998297077895,  -0.3530749266214922,                   -2,
      -1.3394645498187203, -1.82487223090000023, 0.00234234242423,
      -1, -0.0023423423424234, 0.234234234234234324, -2
];

function feedforward(data, solusi, hidden, output, bias ) {
    // console.log('------------------------KERJAKAN FEEDFORWARD------------------------')
    let _solution = solusi;
    let _dtTraining = data;
    const _bias = bias
    const _input = _dtTraining.length; //mendapatkan nilai jumlah nilai inputan dalam data training
    const _hidden = hidden;
    const _output = output;

    // langkah 1, inisialisasi parameter pada input layer ke hidden layer
    // kemudian jumlah input layer * hidden layer + bias to hidden layer
    const _biasToHidden = _bias * _hidden;
    const _inputToHidden = _input * _hidden;
    const _inputAndBiasToHidden = _biasToHidden + _inputToHidden;

    // langkah 2, inisialisasi parameter pada hidden layer ke output layer
    // kemudian jumlah hidden layer * output layer + bias to hidden layer
    const _biasToOuput = _bias * _output;
    const _hiddenToOutput = _hidden * _output;
    const _hiddenAndBiasToOuput = _biasToOuput + _hiddenToOutput;

    // jumlah dimensi pada jaringan MLP
    const dimension = _inputAndBiasToHidden + _hiddenAndBiasToOuput;

    //================================================================
    // total variabel solusi pada input dan bias ke hidden layer
    let _total_vsLayerOne = _solution.length - _hiddenAndBiasToOuput; //total input dan bias ke hidden layer

    // mendapatkan vektor solusi dari layer bagian pertama ke hidden layer
    let _vsLayerOne = []; //simpan vektor solusi sementara
    for (let i = 0; i < _total_vsLayerOne; i++) {
        _vsLayerOne.push(_solution[i]);
    }
    // pisahkan terlebih dahulu bias ke hidden
    // sisa dari _vsLayerOne merupakan variabel solusi dari input ke hidden layer
    let _total_vs_biasToHidden = _total_vsLayerOne - _inputToHidden; //jumlah bias ke hidden layer
    // vektor solusi input layer 
    let _final_vs_inputToHidden = getInputWeight(_solution.slice(_total_vs_biasToHidden, _total_vsLayerOne), _input); //vektor solusi input ke hidden
    
    //================================================================
    // membagi vektor solusi layer pertama dan kedua
    let _vsLayerTwo = _solution.slice(_total_vsLayerOne);
    
    let _total_vs_hiddenToOutput = _solution.length - _inputAndBiasToHidden - _hiddenToOutput; //jumlah vektor solusi hidden ke output layer
    // console.log(`hidden to output = ${_total_vs_hiddenToOutput}`);
    
    //memisahkan vektor solusi bias dan hidden layer dan
    //simpan vektor solusi bias ke dalam variabel
    let _final_vs_biasToHidden = [];
    for (let i = 0; i < _total_vs_hiddenToOutput; i++){
        _final_vs_biasToHidden.push(_vsLayerTwo[i])
    }

    let _final_vs_hiddenToOutput = getInputWeight(_solution.slice(_total_vsLayerOne + _total_vs_hiddenToOutput, solusi.length), hidden); // mendapatkan vektor solusi  hidden ke output

    // menjalankan fungsi aktivasi sebanyak jumlah hidden layer
    // nilai bias akan ditambahkan dengan hasil kali antara nilai input dengan nilai antara bobot input ke hidden
    let _z_in = []
    for (let i = 0; i < hidden; i++){
        let activation1 = _vsLayerOne[i]
        for (let j = 0; j < data.length; j++){
            activation1 += data[j] * _final_vs_inputToHidden[i][j]
        }
        _z_in.push(sigmoid(activation1));
    }

    // menjalankan fungsi aktivasi sebanyak jumlah output layer
    // nilai bias akan ditambahkan dengan hasil kali antara nilai aktivasi pada hidden layer
    // dengan nilai bobot antara hidden ke output layer
    let _z = [];
    for (let i = 0; i < output; i++){
        let activation2 = _vsLayerTwo[i]
        for (let j = 0; j < _z_in.length; j++){
            activation2 += _z_in[j] * _final_vs_hiddenToOutput[i][j]
        }
        _z.push(sigmoid(activation2))
    }
    return _z;
}

function getInputWeight(data, size) {
    let result = [];
    for (let i = 0; i < data.length; i += size) {
        let subArray = [];
        for (let j = 0; j < size; j++) {
            if (i + j < data.length){
                subArray.push(data[i + j]);
            }
        }
        result.push(subArray);
    }
    return result;
}


function testing (){   
    
    for (let i = 0; i < dataTraining.length; i++){
        const hasil_testing = feedforward(dataTraining[i], solusi, 4, 2, 1);
        // console.log(hasil)
        console.log(`data ${i+1} = ${hasil_testing}`);
    }
}
const test = testing();
console.log(test);
