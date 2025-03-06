let expense=[];

function setBalance(){
    const balance=document.getElementById("balance").value;
    if (balance<=0)
        document.getElementById("invalid").innerHTML="Please enter a valid balance";
    localStorage.setItem("balance",balance);
    document.querySelector("#remain_balance").innerHTML=balance;
}

function addExpense(){
    const des=document.querySelector("#desc").value;
    const amt=document.querySelector("#amount").value;
    const date=document.querySelector("#date").value;
    const catg=document.querySelector("#category").value;
    if (amt<=0)
        document.querySelector("#inv").innerText="Please enter valid amount";
    let balance=Number(localStorage.getItem("balance"));
    if (amt>balance)
        document.querySelector("#inv").innerText="Insufficient balance";
    balance-=amt;
    localStorage.setItem("balance",balance);
    expense.push({date,des,amt,catg});
    localStorage.setItem("expense",JSON.stringify(expense));
}
function showExpense(){
    const expense_list=document.querySelector("#expense");
    let expenses=JSON.parse(localStorage.getItem("expense"));
    expenses.forEach((exp,i)=> {
        let tr = document.createElement("tr");
                tr.innerHTML =  '<td>'+exp.date+'</td>'+
                                '<td>'+exp.des+'</td>'+
                                '<td>'+exp.amt+'</td>'+
                                '<td>'+exp.catg+'</td>'+
                               '<td><button class="delete-btn" onclick="deleteExpense(${index}, ${expense.amount})">❌</button></td>;';
                expense_list.appendChild(tr);
    });
    document.querySelector("#remain_balance").innerHTML=localStorage.getItem("balance");

}