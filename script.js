let A = [];
let E21 = [];
let E31 = [];
let E31E21 = [];
let E31E21A = [];
let E32 = [];
let U = [];

function save_matrix(matrix,  order) {
    
    for (let i = 0; i < order; i++) {
        let R = [];
        for(let j = 0; j < order; j++) {
            R.push(parseFloat(document.getElementById(`a${i+1}${j+1}`).value));
        }
        matrix.push(R);
    }
}

function show_matrix(matrix, order, id) {
    let beautiful_matrix = '';
    for(let i = 0; i < order; i++) {
        beautiful_matrix += '[ ';
        for(let j = 0; j < order; j++) {
            beautiful_matrix += `${matrix[i][j]} `
        }
        beautiful_matrix += ']\n';
    }
    document.getElementById(id).innerHTML = `${beautiful_matrix}`;
}

function e2one(order) {

    for(let i = 0; i < order; i++) {
        let R = [];
        for(let j = 0; j < order; j++) {
            if (i == j)
                R.push(1);
            else if (i == 1 && j == 0) {
                let a21 = parseFloat(document.getElementById("a21").value);
                let a11 = parseFloat(document.getElementById("a11").value);
                let e21 = -(a21/a11);
                R.push(e21);
            }
            else
                R.push(0);
        }
        E21.push(R);
    }
}

function e3one(order) {

    for(let i = 0; i < order; i++) {
        let R = [];
        for(let j = 0; j < order; j++) {
            if (i == j)
                R.push(1);
            else if (i == 2 && j == 0) {
                let a31 = parseFloat(document.getElementById("a31").value);
                let a11 = parseFloat(document.getElementById("a11").value);
                let e31 = -(a31/a11);
                R.push(e31);
            }
            else
                R.push(0);
        }
        E31.push(R);
    }
}

function matrixMul(matrix1, matrix2, mulMatrix, order) {
    for(let i = 0; i < order; i++) {
        let R = [];
        for(let j = 0; j < order; j++) {
            let sum = 0;
            for(let k = 0; k < order; k++) {
                sum += (matrix1[i][k]*matrix2[k][j]);
            }
            R.push(sum);
        }
        mulMatrix.push(R);
    }
}

function e3two(order) {
    for(let i = 0; i < order; i++) {
        let R = [];
        for(let j = 0; j < order; j++) {
            if (i == j)
                R.push(1);
            else if (i == 2 && j == 1) {
                let a32 = E31E21A[2][1];
                let a22 = E31E21A[1][1];
                let e32 = -(a32/a22);
                R.push(e32);
            }
            else
                R.push(0);
        }
        E32.push(R);
    }
}