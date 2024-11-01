let order;
let A = [];
let elimination_matrix = [];
let U = [];
let U_dash = [];
let L = [];
let D = [];

function save_order() {
    order = parseFloat(document.getElementById("order").value);
    alert("Order Successfully saved!")
}

function get_matrix_A() {
    for (let i = 0; i < order; i++) {
        let R = [];
        for(let j = 0; j < order; j++) {
            let element = parseFloat(prompt(`Enter the value for a${i+1}${j+1}`));
            R.push(element);
        }
        A.push(R);
    }
    alert("Matrix A is successfully saved!")
}

function show_matrix(matrix, id) {
    let beautiful_matrix = '';
    for(let i = 0; i < order; i++) {
        beautiful_matrix += '[ ';
        for(let j = 0; j < order; j++) {
            beautiful_matrix += `${matrix[i][j]} `
        }
        beautiful_matrix += ']' + '<br>';
    }
    document.getElementById(id).innerHTML = beautiful_matrix;
}

function beautiful_matrix_format(matrix) {
    let beautiful_matrix = '';
    for(let i = 0; i < order; i++) {
        beautiful_matrix += '[ ';
        for(let j = 0; j < order; j++) {
            beautiful_matrix += `${matrix[i][j]} `
        }
        beautiful_matrix += ']' + '<br>';
    }
    return beautiful_matrix;
}

function multiplied_matrix(matrix1, matrix2) {
    let product_matrices = [];
    for(let i = 0; i < order; i++) {
        let R = [];
        for(let j = 0; j < order; j++) {
            let sum = 0;
            for(let k = 0; k < order; k++) {
                sum += (matrix1[i][k]*matrix2[k][j]);
            }
            R.push(sum);
        }
        product_matrices.push(R);
    }
    return product_matrices;
}

function matrixMul_format(matrix1, matrix2, id) {

    const displayElement = document.getElementById(id);
    let mulMatrix = Array.from({length : order}, () => Array(order).fill(0));

    for(let i = 0; i < order; i++) {
        displayElement.innerHTML += mulMatrix;
        for(let j = 0; j < order; j++) {
            let sum = 0;
            for(let k = 0; k < order; k++) {
                sum += (matrix1[i][k]*matrix2[k][j]);
            }
            mulMatrix[i][j] = sum;
        }
    }
}

function get_elimination_matrix(matrix, row, col, value) {
    for (let i = 0; i < order; i++) {
        matrix[i] = [];
        for (let j = 0; j < order; j++) {
            if (i == j)
                matrix[i][j] = 1;
            else if ((i == row) && (j == col))
                matrix[i][j] = value;
            else
                matrix[i][j] = 0;
        }
    }
    return matrix;
}

function U_matrix(id) {

    const displayElement = document.getElementById(id);

    // Making U matrix as a copy of matrix A to reduce it into Row Echelon Form
    U = A.map(row => row.slice());

    // Making elimination_matrix as identity of order n to perform operations
    for (let i = 0; i < order; i++) {
        elimination_matrix[i] = [];
        for (let j = 0; j < order; j++) {
            if (i == j)
                elimination_matrix[i][j] = 1;
            else
            elimination_matrix[i][j] = 0;
        }
    }

    // Start Reducing U 
    for (let i = 0; i < order; i++) {

        // Making temporary elimination matrix for showing the steps
        let temp_elimination_matrix = [];

        // Check whether the diagonal elements are zero or not
        // If zero then swap the rows and then reduce
        for (let j = 0; j < order; j++) {
            if (U[i][i] == 0) {
                if ( i == order-1) {
                    let temp = U[i];
                    U[i] = U[i-1];
                    U[i-1] = temp;
                }
                else {
                    let temp = U[i];
                    U[i] = U[i+1];
                    U[i+1] = temp;
                }
                j--;
            }
        }
        
        // Making the ith column to zero except the current the ith row
        for (let l = i+1; l < order; l++) {

            let multiplying_factor = -(U[l][i]/U[i][i]);

            temp_elimination_matrix = get_elimination_matrix(temp_elimination_matrix, l, i, multiplying_factor);

            // Multiplying the temporary elimination matrix with the original to get product of every elimination matrix at the end.
            elimination_matrix = multiplied_matrix(temp_elimination_matrix, elimination_matrix);

            
            // Displaying the content to show steps
            displayElement.innerHTML += `Elimination matrix: E${l+1}${i+1}, R${l+1} = R${l+1} + xR${i+1}` + '<br>' + `x = -(R${l+1}/R${i+1}) => x = -(a${l+1}${i+1}/a${i+1}${i+1})` + '<br>';
            displayElement.innerHTML += `${beautiful_matrix_format(temp_elimination_matrix)}` + '<br>';

            // Reducing the first non-zero element of lth row and ith column to zero
            for (let m = 0; m < order; m++) {
                U[l][m] += (U[i][m]*multiplying_factor);
                displayElement.innerHTML += `R${l+1} = R${l+1} + (${multiplying_factor})R${i+1}` + '<br>' + `${beautiful_matrix_format(U)}`;
            }
        }
        
    }

    displayElement.innerHTML += `<h2>U matrix</h2>`;
    displayElement.innerHTML += `${beautiful_matrix_format(U)}` + `<br>`;

    displayElement.innerHTML += `<h2>Final Elimination Matrix</h2>`;
    displayElement.innerHTML += `${beautiful_matrix_format(elimination_matrix)}` + `<br>`;
}

function D_matrix(id) {
    
    const displayElement = document.getElementById(id);
    
    // Making D an identity matrix
    for (let i = 0; i < order; i++) {
        D[i] = [];
        for (let j = 0; j < order; j++) {
            if (i == j)
                D[i][j] = 1
            else
                D[i][j] = 0
        }
    }

    displayElement.innerHTML += `<h2>D matrix is</h2>`; 
    
    for(let i = 0; i < order; i++) {
        D[i][i] = U[i][i];
        displayElement.innerHTML += `${beautiful_matrix_format(D)}` + '<br>'; 
    }
}

function beautiful_matrix_format(matrix) {
    let beautiful_matrix = '';
    for(let i = 0; i < order; i++) {
        beautiful_matrix += '[ ';
        for(let j = 0; j < order; j++) {
            beautiful_matrix += `${matrix[i][j]} `
        }
        beautiful_matrix += ']' + '<br>';
    }
    return beautiful_matrix;
}

function L_matrix(id) {

    const displayElement = document.getElementById(id);
    EM = elimination_matrix.map(row => row.slice());

    displayElement.innerHTML += `<h3>A.inverse(A) = Identity`;
    displayElement.innerHTML += `<h3>&#8756; (EM).L = I</h3>` + '<br>';

    // Making L as an identity matrix
    for (let i = 0; i < order; i++) {
        L[i] = [];
        for (let j = 0; j < order; j++) {
            if (i == j)
                L[i][j] = 1
            else
                L[i][j] = 0
        }
    }

    // Start Inverse Process
    for (let i = 0; i < order; i++) {
        for(let j = 0; j < order; j++) {
            if (EM[i][i] != 0) {
                displayElement.innerHTML += `a${i+1}${j+1} = ${EM[i][j]}` + '<br>' + `R${i+1} = R${i+1}/a${i+1}${i+1}` + '<br>';
                L[i][j] /= L[i][i];
                EM[i][j] /= EM[i][i];
            }
            else {
                if (i == order-1) {
                    let temp1 = L[i];
                    L[i] = L[i-1];
                    L[i-1] = temp1;
                    let temp2 = EM[i];
                    EM[i] = EM[i-1];
                    EM[i-1] = temp2;
                }
                else {
                    let temp1 = L[i];
                    L[i] = L[i+1];
                    L[i+1] = temp1;
                    let temp2 = EM[i];
                    EM[i] = EM[i+1];
                    EM[i+1] = temp2;
                }
                j--;
            }
        }

        displayElement.innerHTML += `EM = ` + '<br>' + `${beautiful_matrix_format(EM)}` + '<br>';
        displayElement.innerHTML += `I = ` + '<br>' + `${beautiful_matrix_format(L)}` + '<br>';
        
        for(let k = 0; k < order; k++) {
            if (k != i) {
                multiplying_factor = EM[k][i];
                displayElement.innerHTML += `R${k+1} = R${k+1} - (${multiplying_factor})R${i+1}` + '<br>';
                
                for(let l = 0; l < order; l++) {
                    EM[k][l] -= EM[i][l]*multiplying_factor;
                    L[k][l] -= L[i][l]*multiplying_factor;

                    displayElement.innerHTML += `EM = ` + '<br>' + `${beautiful_matrix_format(EM)}` + '<br>';
                    displayElement.innerHTML += `I = ` + '<br>' + `${beautiful_matrix_format(L)}` + '<br>';
                }
                displayElement.innerHTML += '<br>';
            }
        }
    }

    displayElement.innerHTML += `<h2>L Matrix</h2>` + `${beautiful_matrix_format(L)}` + '<br>';
}

function U_diagonalElem_one(id) {

    const displayElement = document.getElementById(id);

    // Making U dash an identity matrix
    for (let i = 0; i < order; i++) {
        U_dash[i] = [];
        for (let j = 0; j < order; j++) {
            if (i == j)
                U_dash[i][j] = 1
            else
                U_dash[i][j] = 0
        }
    }

    // Reducing diagonal elements of U to 1
    for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
            U_dash[i][j] = (U[i][j]/U[i][i]);
        }
    }

    displayElement.innerHTML += `<h2>U dash Matrix</h2>` + `${beautiful_matrix_format(U_dash)}` + '<br>';
}

function LDU_multiplication(id) {
    const displayElement = document.getElementById(id);

    displayElement.innerHTML += "<h3>General Formula for multiplying matrix is: C<sub>ij</sub> = sigma(A<sub>ik</sub>.B<sub>kj</sub>), where k = [0, n], n = order of the Matrix" + '<br>' + '<br>';

    displayElement.innerHTML += `<h3>Multiplying L with D` + '<br>'; 
    let LD = Array.from({length : order}, () => Array(order).fill(0));
    for(let i = 0; i < order; i++) {
        for(let j = 0; j < order; j++) {
            let sum = 0;
            for(let k = 0; k < order; k++) {
                sum += (L[i][k]*D[k][j]);
            }
            LD[i][j] = sum;
            displayElement.innerHTML += beautiful_matrix_format(LD) + '<br>';
        }
    }
    
    displayElement.innerHTML += `<h3>Multiplying LD with U'` + '<br>'; 
    let LDU = Array.from({length : order}, () => Array(order).fill(0));
    for(let i = 0; i < order; i++) {
        for(let j = 0; j < order; j++) {
            let sum = 0;
            for(let k = 0; k < order; k++) {
                sum += (LD[i][k]*U_dash[k][j]);
            }
            LDU[i][j] = sum;
            displayElement.innerHTML += beautiful_matrix_format(LDU) + '<br>';
        }
    }
}
