const dataTraining = [
    [0,0],
    [0,1],
    [1,0],
    [1,1],
]

const solusi = [    
    -0.09725047433887335,  -0.37094502277165486,
                       1,   0.45833551589609434,
                       1,    0.8634094326181013,
                       1,  -0.07914620760955593,
     -0.5249651100963909,   0.04000486579650264,
                       1,   0.45150083141161146,
    -0.26707705387418446,    -0.666993136138317,
     -0.2192407379966912,   -0.5406376451108322,
       0.350580842670724, -0.013542359955104444,
     0.30067864674476996,   -0.3077265044650615,
                      -1,                    -1,
    -0.22055573062699652, -0.015346717494721385,
                       1,   0.13246369767939428,
                       1,   -0.3795643209571087,
      0.6244816797736558,   0.35592231968576216,
       0.570485464828146,    0.7458388987885378,
     0.40159521775796514,  -0.05566278211351805,
      0.2541909262158767,   0.13558622308759294,
                       1,  -0.39776631113201066,
    -0.10437130259599836,                     1,
                       1
];

//fungsi sigmoid
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}



function Fun(data, solusi, hidden, output) {
    // console.log('------------------------INISIALISASI PARAMETER------------------------')
    let _solution = solusi;
    let _dtTraining = data;
    const _bias = 1;
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
    const dimension = _solution.length;
    // console.log(`jumlah dimensi = ${dimension}`)
    
    // total variabel solusi pada input dan bias ke hidden layer
    let _total_vsLayerOne = _solution.length - _hiddenAndBiasToOuput; //total input dan bias ke hidden layer
    // console.log(`total variabel solusi pada input dan bias ke hidden = ${_total_vsLayerOne}`)

    // mendapatkan vektor solusi dari layer bagian pertama ke hidden layer
    let _vsLayerOne = []; //simpan vektor solusi sementara
    for (let i = 0; i < _total_vsLayerOne; i++) {
        _vsLayerOne.push(_solution[i]);
    }
    // console.log(_solution)
    // console.log(`variabel solusi 1 = ${_vsLayerOne}`)
    // console.log(`variabel solusi 1 = `)
    // console.log(_vsLayerOne);
    
    // pisahkan terlebih dahulu bias ke hidden
    // sisa dari _vsLayerOne merupakan variabel solusi dari input ke hidden layer
    // let _biasToHidden = _total_vsLayerOne - _inputToHidden; //jumlah bias ke hidden layer == _biasToHidden
    // vektor solusi input layer ke hidden layer
    let _vs_inputToHidden = getInputWeight(_solution.slice(_biasToHidden, _total_vsLayerOne), _input); //vektor solusi input ke hidden
    // console.log(`variabel solusi input ke hidden = ${_vs_inputToHidden}`)
    
    //================================================================
    // membagi vektor solusi layer pertama dan kedua
    let _vsLayerTwo = _solution.slice(_total_vsLayerOne);
    // console.log(`variabel solusi 2 = ${_vsLayerTwo}`)
    // console.log(`nilai vs 2 = ${_vsLayerTwo}`)
    let _total_vs_biasToOutput = dimension - _inputAndBiasToHidden - _hiddenToOutput; //jumlah vektor solusi hidden ke output layer
    // console.log(`total variabel solusi bias ke output = ${_total_vs_biasToOutput} `)
    //memisahkan vektor solusi bias dan hidden layer dan
    //simpan vektor solusi bias ke dalam variabel
    let _vs_biasToOutput = [];
    for (let i = 0; i < _total_vs_biasToOutput; i++){
        _vs_biasToOutput.push(_vsLayerTwo[i]) // vektor solusi bias ke output layer
    }
    // console.log(`nilai variabel solusi 2 = ${_vs_biasToOutput}`)
    let _vs_hiddenToOutput = getInputWeight(_solution.slice(_total_vsLayerOne + _total_vs_biasToOutput, solusi.length), hidden); // vektor solusi  hidden ke output
    // console.log(`variabel solusi hidden to output = ${_vs_hiddenToOutput}`)
    let outputFeedForward = feedforward(hidden, data, _vsLayerOne, _vs_inputToHidden, output, _vsLayerTwo, _vs_hiddenToOutput)    
    // asdas
    return outputFeedForward;
}

function feedforward(hiddenLayer, data, vektorSolusi1, vektorSolusiInputToHidden, outputLayer, vektorSolusi2, vektorSolusiHiddenToOutput){
    // menghitung nilai fungsi aktivasi pada input layer ke hidden layer
    // console.log(`=============================FeedFoward=============================`)
    // console.log(`jumlah hidden layer = ${hiddenLayer}`)
    // console.log(vektorSolusi1)
    // console.log(vektorSolusiInputToHidden)
    // console.log(`data = ${data}`)
    // console.log(`panjang data = ${data.length}`)
    let _z_in = []
    for (let i = 0; i < hiddenLayer; i++){
        // console.log(`\nhidden layer ${i+1}`)
        let activation1 = vektorSolusi1[i]
        // console.log(`nilai bias ${i+1} = ${activation1}`)
        for (let j = 0; j < data.length; j++){
            // console.log(activation1)
            // console.log(`nilai data[${j+1}] = ${data[j]}`)
            // console.log(`vektor solusi input to hidden = ${vektorSolusiInputToHidden[i][j]} `)
            activation1 += data[j] * vektorSolusiInputToHidden[i][j]
        }
        // console.log(activation1)
        let sigmoidHidden = sigmoid(activation1)
        // console.log(sigmoidHidden);
        _z_in.push(sigmoidHidden);
        // console.log(activation1)
    }
    // console.log(_z_in)
    // console.log(outputLayer)
    // console.log(vektorSolusi2)
    // menghitung nilai fungsi aktivasi pada hidden layer ke output layer
    let _z = []; // menampung nilai aktivasi dari hidden ke output layer
    for (let i = 0; i < outputLayer; i++){
        // console.log(`nilai aktivasi pada hidden = ${_z_in}`)
        // console.log(`\n\nnilai pada output ${i+1}`)
        let activation2 = vektorSolusi2[i]
        // console.log(`nilai bias ${i+1} = ${vektorSolusi2[i]}`)
        for (let j = 0; j < _z_in.length; j++){ 
            // console.log(`nilai _z ${j+1} = ${_z_in[j]}`)
            // console.log(`nilai vektor solusi hidden to output = ${vektorSolusiHiddenToOutput[i][j]}`)
            activation2 += _z_in[j] * vektorSolusiHiddenToOutput[i][j]
        }
        let sigmoidOutput = sigmoid(activation2)
        // console.log(`nilai sigmoid output ${sigmoidOutput}`)
        _z.push(sigmoidOutput)
    }
    // console.log(`nilai y Feed Forward = ${_z}`)
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
        // console.log(`data ${i+1}`)
        console.log(dataTraining[i])
        const hasil_testing = Fun(dataTraining[i], solusi, 10, 1);
        for (let j = 0; j < hasil_testing.length; j++) {
            console.log(hasil_testing[j])
        }
    }
}
const test = testing();
console.log(test);
