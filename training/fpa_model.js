function fpaDemo(para = [3, 0.8]) {
    const n = para[0];  // ukuran populasi
    const p = para[1];  // switch Probability 
    const N_iter = 10;  // Iterasi

    const d = 3;
    const Lb = Array(d).fill(-2);
    const Ub = Array(d).fill(2);

    let Sol = [];
    let Fitness = [];

    for (let i = 0; i < n; i++) {
        Sol[i] = Lb.map((lb, index) => lb + (Ub[index] - lb) * Math.random());
        console.log(`nilai Solusi ke ${i+1} = ${Sol[i]}`);
        Fitness[i] = Fun(Sol[i]);
        console.log(`nilai fitnes ke ${i+1} = ${Fitness[i]}`);
    }


    console.log(`Solusi = ${Sol}`);
    let fmin = Math.min(...Fitness); //mendapatkan nilai fitnes terkecil dari setiap fitnes dalam populasi
    console.log(`\nnilai Fitnes Min: ${fmin}`);
    let best = Sol[Fitness.indexOf(fmin)];  //mendapatkan nilai solusi dari fitnes terkecil
    console.log(`\nnilai best: ${best}`);
    let S = [...Sol];
    console.log(`\n Solusi: ${S}\n========================================================================================================================================`);

    for (let t = 0; t < N_iter; t++) {
        for (let i = 0; i < n; i++) {
            console.log(`\niterasi ${t+1} --- populasi ${i+1}`);
            let randomP = Math.random();
            // console.log(`\nnilai random p = ${randomP}`);
            if (randomP < p) { 
                // console.log(`\nnilai random p = ${randomP}`);
                let L = Levy(d);
                // console.log(`\nNilai Levy Flight ke ${t}, ${i}: ${L}`)
                let dS = L.map((l, index) => l * (Sol[i][index] - best[index]));
                // console.log(`\nnilai ds = ${dS}`);
                S[i] = Sol[i].map((sol, index) => sol + dS[index]);
                // console.log(`\nNilai S-${i} = ${S[i]}`);
                S[i] = simpleBounds(S[i], Lb, Ub);
                console.log(`Global Pollination\nNilai Sol[${t}, ${i}] = ${S[i]}`);
            } else {
                let epsilon = Math.random();
                let JK = shuffle([...Array(n).keys()]);
                S[i] = S[i].map((s, index) => s + epsilon * (Sol[JK[0]][index] - Sol[JK[1]][index]));
                S[i] = simpleBounds(S[i], Lb, Ub);
                console.log(`\nLocal Pollination\nNilai Sol[${t}, ${i}] = ${S[i]}`);
            }
            let Fnew = Fun(S[i]);
            console.log(`----------------------------------------------------------------`)
            console.log(`nilai Fitnes [${t}, ${i}] = ${Fitness[i]}`);
            console.log(`nilai Fnew [${t}, ${i}] = ${Fnew}`);
            console.log(`nilai Fmin [${t}, ${i}] = ${fmin}`);
            console.log(`----------------------------------------------------------------`)
            if (Fnew <= Fitness[i]) {
                console.log(`\nEvaluasi solusi baru\n Fnew <= Fitness?\n Fitness == Fnew`)
                Sol[i] = [...S[i]];
                Fitness[i] = Fnew;
                // console.log(`nilai Fnew [${t}, ${i}] = ${Fnew}`);
                console.log(`nilai Sol [${t}, ${i}] = ${Sol[i]}`);
                console.log(`nilai new [${t}, ${i}] = ${Fitness[i]}`);
            }
            // console.log(`----------------------------------------------------------------`)
            // console.log(`\nnilai Fitnes min ${fmin}`);
            // console.log(`----------------------------------------------------------------`)
            if (Fnew <= fmin) {
                console.log(`perbarui global best\n Fnew <= fmin?\n fmin == Fnew`)
                best = [...S[i]];
                fmin = Fnew;
                console.log(`nilai best [${t}, ${i}] = ${best}`);
                console.log(`nilai Fnew [${t}, ${i}] = ${Fnew}`);
            }
            // console.log(`nilai Fitnes [${t}, ${i}] = ${Fitness[i]}`);
            // console.log(`Iterasi ${t} Populasi ${i} Posisi terbaik ${best} nilai fungsi baru ${Fnew}`)
        }
        if (t % 100 === 0) {
            // console.log(`Iteration: ${t}, Best: ${best}, fmin: ${fmin}`);
        }
    }
    console.log(`Total number of evaluations: ${N_iter * n}`);
    console.log(`Best solution: ${best}, fmin: ${fmin}`);
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

function Fun(u) {
    return Math.pow(1 - u[0], 2) + 100 * Math.pow(u[1] - Math.pow(u[0], 2), 2) + 100 * Math.pow(u[2] - Math.pow(u[1], 2), 2);
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
// console.log(Levy(3))
console.log(hasil);
