var board;
var score = 0;
var size = 4;
window.onload=function(){
    setGame();
    makeBoard();
}
function setGame(){
    board= [
        [0,0,0,0],
        [0,2,0,0],
        [0,2,0,0],
        [0,0,0,0]
    ]
}
document.addEventListener('keypress', (event)=>{
    console.log(event.key);
    if (["w", "a", "s", "d"].includes(event.key)) {
        if(event.key === "w") {
            passMatrixUp();
        } else if (event.key === "s") {
            passMatrixDown();
        } else if (event.key === "d") {
            passMatrixRight();
        } else if (event.key === "a") {
            passMatrixLeft();
        }
        updateBoard();
        generateRandom();
    }
});
function makeBoard() {
    for (let i=0;i<4;i++) {
        for (let j=0;j<4;j++) {
            const temp = document.createElement('p');
            temp.innerHTML = board[i][j];
            const cont = document.getElementById((i*4)+j);
            cont.appendChild(temp);
        }
    }
}
function updateBoard() {
    for (let i=0;i<4;i++) {
        for (let j=0;j<4;j++) {
            const temp = document.createElement('p');
            temp.innerHTML = board[i][j];
            const cont = document.getElementById((i*4)+j);
            cont.removeChild(cont.children[0]);
            cont.appendChild(temp);
        }
    }
    const scr = document.createElement('p');
    scr.innerHTML = score;
    const cont_ = document.getElementById('score');
    cont_.removeChild(cont_.children[0]);
    cont_.appendChild(scr);
}

function passMatrixLeft() {
    for (let i=0;i<size;i++) {
        board[i] = modifyArray(board[i]);
    }
}
function passMatrixRight() {
    for (let i=0;i<size;i++) {
        board[i] = modifyArray(board[i].reverse());
        board[i].reverse();
    }
}
function passMatrixUp() {
    for (let j=0;j<size;j++) {
        let tmp = new Array(size);
        for (let i=0;i<size;i++) {
            tmp[i] = board[i][j];
        }
        tmp = modifyArray(tmp);
        for (let i=0;i<size;i++) {
            board[i][j] = tmp[i];
        }
    }
}
function passMatrixDown() {
    for (let j=0;j<size;j++) {
        let tmp = new Array(size);
        for (let i=0;i<size;i++) {
            tmp[i] = board[size-i-1][j];
        }
        tmp = modifyArray(tmp);
        for (let i=0;i<size;i++) {
            board[size-i-1][j] = tmp[i];
        }
    }
}
function modifyArray(oldArr) {
    let n = oldArr.length;
    let newArr = new Array(n).fill(0);
    let x = 0;
    for (let i=0;i<n;i++) {
        if (oldArr[i] != 0) {
            oldArr[x] = oldArr[i];
            x++;
        }
    }
    n = x;
    if (x == 0)
        return oldArr;
    else if (x == 1) {
        newArr[0] = oldArr[0];
        return newArr;
    }
    
    oldArr = oldArr.slice(0, x); 
    
    x = 0;
    for (let i=0;i<n;i++) {
        if (i<n && oldArr[i] == oldArr[i+1]) {
            newArr[x] = oldArr[i]*2;
            score += oldArr[i]; //same block that added to scrore
            i++;
        } else {
            newArr[x] = oldArr[i];
        }
        x++;
    }
    return newArr;
}
function generateRandom() {
    let empty = [];
    // let mn = 4096, mx = -1;
    for (let i=0;i<size;i++) {
        for (let j=0;j<size;j++) {
            if (board[i][j] == 0)
                empty.push((size*i)+j);
            // mn = Math.min(mn, board[i][j]);
            // mx = Math.max(mx, board[i][j]);
        }
    }
    let pos1 = empty[Math.floor(Math.random() * empty.length)];
    board[Math.floor(pos1/size)][pos1%size] = 2;
    updateBoard();
}
