function fpaDemo(para = [20, 0.8]) {
    const n = para[0];  // ukuran populasi
    const p = para[1];  // switch Probability 
    const N_iter = 100;  // Iterasi

    const dataTraining = [
        [1,0,0,1],
        [0,0,1,1],
        [0,0,1,0],
        [1,0,1,0],
        // DBD
            // [0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            // [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
            // [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            // [0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            // [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            // [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
            // [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0],
            // [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
            // [1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            // [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
            // [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            // [1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            // [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
            // [1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0],
            // [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            // [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0],
            // [1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
            // [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            // [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0],
            // [0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        // //MALARIA
        // [0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0],
        // [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        // [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
        // [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
        // [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        // [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // [0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        // [1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        // [0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        // [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        // [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        // [1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    ]
    const input = dataTraining[0].length;
    const hidden = 3;
    const output = 1;
    const d = (input * hidden) + hidden + (hidden * output) + output;
    console.log(`dimensi = ${d}`) //jumlah dimensi
    const Lb = Array(d).fill(-2);
    const Ub = Array(d).fill(2);

    let Sol = []; // variabel untuk menampung solusi, solusi akan ditampung sesuai jumlah populasi
    let Fitness = []; // variable untuk menampung nilai fitness, nilai fitness sebanyak jumlah populasi

    // bangkitkan populasi dengan solusi acak,
    // jumlah dimensi berpengaruh untuk nilai solusi awal pembangkitan populasi
    // nilai solusi baru diproses dengan fungsi feedforward untuk mendapatkan nilai
    // Fitness sementara
    // nilai Fitness sementara disimpan pada variabel Fitness
    
    console.log(`Bangkitkan Populasi dengan solusi acak\n=====================================================`);
    for (let i = 0; i < n; i++) {
        Sol[i] = Lb.map((lb, index) => lb + (Ub[index] - lb) * Math.random()); 
        console.log(`nilai Solusi ke ${i+1} = ${Sol[i]}`); // Sol ke i merupakan vektor solusi atau solusi pada populasi ke n
        Fitness[i] = Fun(dataTraining[0], Sol[i], hidden, output); // Fitness  ke i merupakan nilai fitness min pada vektor solusi atau pada solusi pada populasi ke n
        // console.log(`nilai fitnes ke ${i+1} = ${Fitness[i]}`);
    }
    
    console.log(`Solusi =`);
    console.log(Sol)
    console.log(`Fitness =`);
    console.log(Fitness)
    let fmin = Math.min(...Fitness); //mendapatkan nilai fitnes terkecil dari setiap Fitnes
    let indexFmin = Fitness.indexOf(fmin) ; //mendapatkan nilai index populasi
    let best = Sol[Fitness.indexOf(fmin)];  //mendapatkan nilai solusi dari fitnes terkecil
    console.log(`nilai fmin pada Fitness didapatkan pada Fitness ke = ${indexFmin+1}`)
    console.log(`nilai fmin pada Fitness = ${fmin}`)
    console.log(`best = `)
    console.log(best)
    // console.log(`\nnilai Fitnes Min: ${fmin}\n=====================================================\n=====================================================`);
    // console.log(`fmin = ${fmin} pada index ke ${indexFmin+1}\nbest = ${best}`);

    // variabel S sama seperti nilai pada variabel Sol dimana akan menampung seluruh nilai vektor solusi atau solusi pada populasi ke n 
    // namun fungsi variabel S dipakai saat pengerjaan FPA untuk menampung nilai solusi baru pada proses global atau lokal penyerbukan
    let S = [...Sol];
    // console.log('S = ')
    // console.log(S)
    // console.log(`\n Solusi: ${S}\n========================================================================================================================================`);
    // console.log(`\n\n================================================ KERJAKAN FPA ================================================`)
    for (let t = 0; t < N_iter; t++) {
        console.log(`                                                      ITERASI ${t+1}`)
        for (let i = 0; i < n; i++) {
            console.log(`                                                       POPULASI ${i+1}`)
            // console.log(`\niterasi ${t+1} --- populasi ${i+1}`);
            // console.log(`nilai Sol-${i+1}`)
            // console.log(Sol[i])
            let randomP = Math.random();
            // console.log(`\nnilai random p = ${randomP}`);
            if (randomP < p) { // satu populasi hanya menggunakan 1x random p
                // console.log(`PENYERBUKAN GLOBAL`) 
                // console.log(`\nnilai random p = ${randomP}`);
                let L = Levy(d);
                // console.log(`\nNilai Levy Flight ke ${t}, ${i}: ${L}`)
                let dS = L.map((l, index) => l * (Sol[i][index] - best[index]));
                // console.log(`\nnilai ds = ${dS}`);
                S[i] = Sol[i].map((sol, index) => sol + dS[index]);
                // console.log(`\nNilai S-${i} = ${S[i]}`);
                S[i] = simpleBounds(S[i], Lb, Ub);
                // console.log(`Global Pollination\nNilai Sol[${t}, ${i}] = ${S[i]}`);
                // console.log(`===HASIL PENYERBUKAN GLOBAL===\niterasi ${t+1} populasi ${i+1} =`);
                // console.log(S[i])
                // console.log(Sol[i])
                // console.log(Sol[i])
            } else {
                // console.log('|||PENYERBUKAN LOKAL|||')
                let epsilon = Math.random();
                let JK = shuffle([...Array(n).keys()]);
                S[i] = S[i].map((s, index) => s + epsilon * (Sol[JK[0]][index] - Sol[JK[1]][index]));
                S[i] = simpleBounds(S[i], Lb, Ub);
                // console.log(`\nLocal Pollination\nNilai Sol[${t}, ${i}] = ${S[i]}`);
            }
            console.log(`nilai solusi terbaru hasil penyerbukan = `)
            // console.log(`hasil nilai S-${i+1}`)
            console.log(S[i])
            let FnewFF = []; // variabel FnewFF akan menampung hasil proses FF. solusi hasil proses penyerbukan akan di proses dengan data yang ada
            for (let j = 0; j < dataTraining.length; j++) {
                // console.log(`data ke ${j+1}`)
                FnewFF[j] = Fun(dataTraining[j], S[i], hidden, output);
                // console.log(`data ${j+1} >>> nilai Fnew = ${FnewFF}`)
            }
            // console.log(FnewFF)
            let Fnew = Math.min(...FnewFF)
            // console.log(`nilai Fnew = ${Fnew}`)
            
            // console.log(`----------------------------------------------------------------`)
            // console.log(`nilai Fitnes [${t}, ${i}] = ${Fitness[i]}`);
            // console.log(`nilai Fnew [${t}, ${i}] = ${Fnew}`);
            // console.log(`nilai Fmin [${t}, ${i}] = ${fmin}`);
            // console.log(`----------------------------------------------------------------`)
            // console.log(`nilai Fitness-${i+1} = ${Fitness[i]}`)
            
            // update Sol [i] dan Fitness [i], jika nilai Fnew pada populasi sekarang kurang dari Fitness ke i pada populasi sebelumnya
            if (Fnew <= Fitness[i]) { 
                // console.log(`\nEvaluasi solusi baru\n Fnew <= Fitness?\n Fitness == Fnew`)
                Sol[i] = [...S[i]];
                Fitness[i] = Fnew;

                // console.log(`nilai Sol[${i+1}] =`)
                // console.log(Sol[i])
                // console.log(`niali Fitness [${i+1}] = ${Fnew}`)
                // asdsad
                // console.log(`nilai Fnew [${t}, ${i}] = ${Fnew}`);
                // console.log(`nilai Sol [${t}, ${i}] = ${Sol[i]}`);
                // console.log(`nilai new [${t}, ${i}] = ${Fitness[i]}`);
            }
            // console.log(`----------------------------------------------------------------`)
            // console.log(`\nnilai Fitnes min ${fmin}`);
            // console.log(`----------------------------------------------------------------`)

            // update best dan fmin, jika Fnew pada populasi sekarang kurang dari fmin pada iterasi sebelumnya
            if (Fnew <= fmin) { 
                // console.log(`perbarui global best\n Fnew <= fmin?\n fmin == Fnew`)
                best = [...S[i]];
                fmin = Fnew;
                // console.log(`nilai best [${t}, ${i}] = ${best}`);
                // console.log(`nilai Fnew [${t}, ${i}] = ${Fnew}`);
            }
            console.log(`nilai fmin = ${fmin}`);
            console.log(`best = `)
            console.log(best)
            // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
            // console.log(`=============\nFmin = ${fmin}`);

            // console.log(Fitness.indexOf(fmin))
            // console.log(`Best Solusi =`);
            // console.log(best);
            // console.log(`iterasi ${t+1} populasi ${i+1} || best solusi : ${Sol[i]} || Fmin = ${fmin}`);
            // console.log(`nilai Fitnes [${t+1}, ${i+1}] = ${Fitness[i]}`);
            // console.log(`Iterasi ${t+1} Populasi ${i+1} Posisi terbaik ${best} nilai fungsi baru ${Fnew}`)
        }
        // if (t % 100 === 0) {
        //     console.log(`Iteration: ${t}\nBest: ${best}\n
        //                         fmin: ${fmin}\n`);
        // }
        console.log(`iterasi ${t+1}, fmin: ${fmin}\nbset = `);
        console.log(best)
        // asdfsdadf
    }

    console.log(`Total number of evaluations: ${N_iter * n}`);
    console.log(`Best solution: ${best}\n fmin: ${fmin}`);
    return { best, fmin, N_iter };
}

function simpleBounds(s, Lb, Ub) {
    return s.map((val, index) => Math.max(Math.min(val, Ub[index]), Lb[index]));
}

function Levy(d) {
    const beta = 3 / 2;
    const sigma = Math.pow((gamma(1 + beta) * Math.sin(Math.PI * beta / 2) / 
                            (gamma((1 + beta) / 2) * beta * Math.pow(2, (beta - 1) / 2))), 1 / beta);
    const u = Array.from({ length: d }, () => randn() * sigma);
    const v = Array.from({ length: d }, () => randn());
    return u.map((ui, i) => 0.01 * ui / Math.pow(Math.abs(v[i]), 1 / beta));
}

//fungsi sigmoid
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function Fun(data, solusi, hidden, output ) {
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
    console.log(`jumlah dimensi = ${dimension}`)
    
    // total variabel solusi pada input dan bias ke hidden layer
    let _total_vsLayerOne = _solution.length - _hiddenAndBiasToOuput; //total input dan bias ke hidden layer

    // mendapatkan vektor solusi dari layer bagian pertama ke hidden layer
    let _vsLayerOne = []; //simpan vektor solusi sementara
    for (let i = 0; i < _total_vsLayerOne; i++) {
        _vsLayerOne.push(_solution[i]);
    }
    console.log(`variabel solusi 1 = `)
    console.log(_vsLayerOne);
    
    // pisahkan terlebih dahulu bias ke hidden
    // sisa dari _vsLayerOne merupakan variabel solusi dari input ke hidden layer
    // let _biasToHidden = _total_vsLayerOne - _inputToHidden; //jumlah bias ke hidden layer == _biasToHidden
    // vektor solusi input layer ke hidden layer
    let _vs_inputToHidden = getInputWeight(_solution.slice(_biasToHidden, _total_vsLayerOne), _input); //vektor solusi input ke hidden
    
    //================================================================
    // membagi vektor solusi layer pertama dan kedua
    let _vsLayerTwo = _solution.slice(_total_vsLayerOne);
    console.log(`nilai vs 2 = ${_vsLayerTwo}`)
    let _total_vs_biasToOutput = dimension - _inputAndBiasToHidden - _hiddenToOutput; //jumlah vektor solusi hidden ke output layer
    
    //memisahkan vektor solusi bias dan hidden layer dan
    //simpan vektor solusi bias ke dalam variabel
    let _vs_biasToOutput = [];
    for (let i = 0; i < _total_vs_biasToOutput; i++){
        _vs_biasToOutput.push(_vsLayerTwo[i]) // vektor solusi bias ke output layer
    }
    
    let _vs_hiddenToOutput = getInputWeight(_solution.slice(_total_vsLayerOne + _total_vs_biasToOutput, solusi.length), hidden); // vektor solusi  hidden ke output
    
    let outputFeedForward = feedforward(hidden, data, _vsLayerOne, _vs_inputToHidden, output, _vsLayerTwo, _vs_hiddenToOutput)
    console.log(`nilai output FF = ${outputFeedForward}`)
    
    let fmin = Math.min(...outputFeedForward);
    // console.log(`fmin = ${fmin}`)
    // asdasds
    return fmin;
}

function feedforward(hiddenLayer, data, vektorSolusi1, vektorSolusiInputToHidden, outputLayer, vektorSolusi2, vektorSolusiHiddenToOutput){
    // menghitung nilai fungsi aktivasi pada input layer ke hidden layer
    let _z_in = []
    for (let i = 0; i < hiddenLayer; i++){
        let activation1 = vektorSolusi1[i]
        for (let j = 0; j < data.length; j++){
            activation1 += data[j] * vektorSolusiInputToHidden[i][j]
        }
        _z_in.push(sigmoid(activation1));
        
    }
    // menghitung nilai fungsi aktivasi pada hidden layer ke output layer
    let _z = []; // menampung nilai aktivasi dari hidden ke output layer
    for (let i = 0; i < outputLayer; i++){
        let activation2 = vektorSolusi2[i]
        for (let j = 0; j < _z_in.length; j++){ 
            activation2 += _z_in[j] * vektorSolusiHiddenToOutput[i][j]
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


function gamma(z) {
    const g = 7;
    const C = [
        0.99999999999980993, 676.5203681218851, -1259.1392167224028,
        771.32342877765313, -176.61502916214059, 12.507343278686905,
        -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
    ];

    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    } else {
        z -= 1;
        let x = C[0];
        for (let i = 1; i < g + 2; i++) {
            x += C[i] / (z + i);
        }
        const t = z + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
    }
}

function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Contoh penggunaan
const hasil = fpaDemo();
console.log(hasil);
