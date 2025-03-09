let expense=JSON.parse(localStorage.getItem("expense")) || [];
window.onload = function () {
    if (localStorage.getItem("balance")) {
        document.querySelector("#remain_balance").innerHTML = localStorage.getItem("balance");
    }
    if (expense.length > 0) {
        showExpense();  
    }
};
document.querySelector("#table").style.visibility="hidden";
document.querySelector("#legend").style.visibility="hidden";

function setBalance(){
    const balance=document.getElementById("balance").value;
    if (balance<=0)
        document.getElementById("invalid").innerHTML="Please enter a valid balance";
    localStorage.setItem("balance",balance);
    document.querySelector("#remain_balance").innerHTML=balance;
}

function addExpense(){
    const des=document.querySelector("#desc").value;
    const amt=Number(document.querySelector("#amount").value);
    const date=document.querySelector("#date").value;
    const catg=document.querySelector("#category").value;
    if (amt<=0)
        document.querySelector("#inv").innerText="Please enter valid amount";
    let balance=Number(localStorage.getItem("balance"));
    if (amt>balance){
        document.querySelector("#inv").innerText="Insufficient balance";
        return;
    }
    balance-=amt;
    localStorage.setItem("balance",balance);
    expense.push({date,des,amt,catg});
    localStorage.setItem("expense",JSON.stringify(expense));
    showExpense();
}
function showExpense(){
    document.querySelector("#table").style.visibility="visible";
    document.querySelector("#piechart").style.visibility="visible";
    document.querySelector("#legend").style.visibility="visible";
    const expense_list=document.querySelector("#expense");
    expense_list.innerHTML="";
    let expenses=JSON.parse(localStorage.getItem("expense")) || [];
    let total_food = 0, total_trans = 0, total_shop = 0, total_ent = 0, total_others = 0, total = 0;
    expenses.forEach((exp,i)=> {
        let tr = document.createElement("tr");
                tr.innerHTML =  '<td>'+exp.date+'</td>'+
                                '<td>'+exp.des+'</td>'+
                                '<td>'+exp.amt+'</td>'+
                                '<td>'+exp.catg+'</td>';
                expense_list.appendChild(tr);
        let amount=Number(exp.amt);
        if (exp.catg=='Food')
            total_food+=amount;
        if (exp.catg=='Transport')
            total_trans+=amount;
        if (exp.catg=='Shopping')
            total_shop+=amount;
        if (exp.catg=='Entertainment')
            total_ent+=amount;
        if (exp.catg=='Others')
            total_others+=amount;
        total+=amount;
    });
    let food=total_food/total*100;
    let transport=food+(total_trans/total)*100;
    let shop=transport+(total_shop/total)*100;
    let entertain=shop+(total_ent/total)*100;
    let others=entertain+(total_others/total)*100;
    document.querySelector("#piechart").style.background = `conic-gradient(green 0% ${food}%,red ${food}% ${transport}%, blue ${transport}% ${shop}%, orange ${shop}% ${entertain}%, lightgray ${entertain}% 100%)`;
    document.querySelector("#remain_balance").innerHTML=localStorage.getItem("balance");
    console.log(total);
    //'<td><button class="delete-btn" onclick="deleteExpense(${index}, ${expense.amount})">❌</button></td>;';
}
function hideExpense(){
    document.querySelector("#table").style.visibility="hidden";
    document.querySelector("#piechart").style.visibility="hidden";
    document.querySelector("#legend").style.visibility="hidden";
}

