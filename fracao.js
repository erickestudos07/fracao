function mostrarFracao() {
    var numerador = parseInt(document.getElementById('numerador').value);
    var denominador = parseInt(document.getElementById('denominador').value);

    var fracao = simplificarFracao(numerador, denominador);
    numerador = fracao[0];
    denominador = fracao[1];
    alert(numerador + "/" + denominador);
}

function simplificarFracao(numerador, denominador) {
    var numerosPrimos = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    numerosPrimos.forEach(numero => {
        while (true) {
            if (numerador % numero == 0 && denominador % numero == 0 && numerador > 1 && denominador > 1) {
                numerador /= numero;
                denominador /= numero;
            } else {
                break;
            }
        }
    });
    if (numerador > denominador) {
        var quantidadeInteira;
        if (numerador % denominador == 0) {
            if (numerador > 1 && denominador > 1) {
                numerador /= denominador;
                denominador /= denominador;
            }
            quantidadeInteira = numerador;
        } else {
            quantidadeInteira = Math.floor(numerador / denominador);
            quantidadeInteira++;
        }

        maiorQueUm(quantidadeInteira, numerador, denominador)
    } else if (denominador > numerador) {
        if (numerador > 1 && denominador > 1 && denominador % numerador == 0) {
            denominador /= numerador;
            numerador /= numerador;
        }
        desenharFracaoMenorQueUm(numerador, denominador);
    } else {
        desenharFracaoIgualAUm();
    }
    var fracao = [numerador, denominador];
    return fracao;
}

function maiorQueUm(linhas, numerador, denominador) {
    var canvas = document.querySelector('canvas');
    var pincel = canvas.getContext('2d');
    limparQuadro(pincel);
    pincel.fillStyle = 'green';

    var tamanho = 50;
    var aux = 0;
    var x = 0;
    var y = 0;
    var yD = 0;
    var auxN = 0
    var auxNumerador = numerador;


    while (linhas > 0) {
        while (aux < auxNumerador) {
            if (auxN >= denominador) {
                break;
            }
            x = tamanho * aux;
            if (aux > 11) {
                auxNumerador -= aux;
                aux = 0;
                y += 50;
            } else {
                pincel.fillRect(x, y, tamanho, tamanho);
                aux++;
                auxN++;
            }
        }

        aux = 0;
        x = 0
        var auxDenominador = denominador;

        while (aux < auxDenominador) {
            x = tamanho * aux;
            if (aux > 11) {
                auxDenominador -= aux;
                aux = 0;
                yD += 50;
            } else {
                pincel.strokeRect(x, yD, tamanho, tamanho);
                aux++;
            }
        }

        aux = 0;
        x = 0;
        y += 100;
        yD += 100;
        linhas--;
        if (linhas == 1) {
            auxN = denominador - (numerador % denominador);
        } else {
            auxN = 0;
        }
    }
}

function desenharFracaoMenorQueUm(numerador, denominador) {
    var canvas = document.querySelector('canvas');
    var pincel = canvas.getContext('2d');
    limparQuadro(pincel);
    pincel.fillStyle = 'green';

    var tamanho = 50;
    var aux = 0;
    var x = 0;
    var y = 0;
    var auxNumerador = numerador;

    while (aux < auxNumerador) {
        x = tamanho * aux;
        pincel.fillRect(x, y, tamanho, tamanho);
        if (aux > 11) {
            auxNumerador -= aux;
            aux = 0;
            y += 50;
        } else {
            aux++;
        }
    }

    aux = 0;
    x = 0;
    y = 0;
    var auxDenominador = denominador;

    while (aux < auxDenominador) {
        x = tamanho * aux;
        pincel.strokeRect(x, y, tamanho, tamanho);
        if (aux > 11) {
            auxDenominador -= aux;
            aux = 0;
            y += 50;
        } else {
            aux++;
        }
    }
}

function desenharFracaoIgualAUm() {
    var canvas = document.querySelector('canvas');
    var pincel = canvas.getContext('2d');
    limparQuadro(pincel);
    pincel.fillStyle = 'green';
    pincel.fillRect(0, 0, 50, 50);
    pincel.strokeRect(0, 0, 50, 50);
}

function limparQuadro(pincel) {
    pincel.clearRect(0, 0, 600, 1400);
}