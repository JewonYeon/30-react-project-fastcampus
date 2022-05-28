let left = null, right = null, oper = null, res = false, resValue = null;

function save() {
  const input = document.getElementById('top-input');
  let value = "";

  if (left === null) return;
  value += left + " ";
  input.value = value;

  if (oper === null) return;
  value += oper + " ";
  input.value = value;

  if (right === null) return;
  value += right + " ";
  input.value = value;

  if (res) { 
    switch(oper) {
      case "+":
        resValue = parseInt(left) + parseInt(right);
        break;
      case "-":
        resValue = parseInt(left) - parseInt(right);
        break;
      case "*":
        resValue = parseInt(left) * parseInt(right);
        break;
      case "/":
        resValue = parseInt(left) / parseInt(right);
        break;
    }
    value += "= " + resValue;
    input.value = value;
  }
}

function inputNum(num) {
  if (oper === null) {
    if (left === null) {
      left = `${num}`;
    }
    else {
      if (num === 0 && parseInt(left) === 0) {
        return;
      }
      left += `${num}`;
    }
  }
  else {
    if (right === null) {
      right = `${num}`;
    }
    else {
      if (num === 0 && parseInt(right) === 0) {
        return;
      }
      right += `${num}`;
    }
  }
  save();
};

function inputOper(op) {
  if (left === null && op === '-') {
    left = "-"
    return;
  }

  if (left === "-" && op === '-') {
    return;
  }

  if (op === "-" && oper !== null && right === null) {
    right = "-";
    save()
    return;
  }

  oper = op;
  save();
}

function inputEqu() {
  if (left === null || right === null || !oper) {
    return;
  }

  if (res) {
    left = resValue;
    right = null;
    resValue = null;
    oper = null;
    res = false;
  }
  else {
    res = true;
  }
  save()
}