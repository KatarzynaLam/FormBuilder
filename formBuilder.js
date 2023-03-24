var Form = function(formBuilderContainer, buttonAdd){
    let formChildInput = {
        id:-1,
        buttonAddChild : null,
        buttonRemoveChild : null,
        parentType : null,
        condition : null,
        formChildInput: this.formChildInput  //tablica

    }
    let formParentInput={
        id:-1,
        buttonAddChild: null,
        buttonRemove : null,
        type : null,
        question : null,
        formChild: formChildInput //tablica
    }

    let form={
        formBuilder: formBuilderContainer,
        types: ["Text", "Number", "Yes/No"],
        parentText:["Question", "Types"],
        childText:["Condition","Question", "Types"],
        conditionTypes: ["Equals", "Greater than", "Less than"],
        buttonAddParentInput: buttonAdd,
        formClass: document.getElementsByClassName("formInput")[0],
        formParentClassName: "parentInputClass",
        formChildClassName: "childInputClass",
        formInput : {
            formParent: new Array() //tablica glownych
        }

    }
    var id = 0
            //create class parent input 
            //create class strings
                //create string "Question"
                //create string "Type"
            //create class inputs 
                //create input text
                //create type
            //button
           // document.getElementById("selectParentType").selectedOptions[0].value
    
    form.createConditionClass = (parentType) =>{
        var selectType = document.createElement("SELECT");
        selectType.id = "selectConditionType"
        selectType.setAttribute("name", "selectConditionType")
        var conditionInput = null 
        if(parentType == "Text"){
            conditionInput = document.createElement("INPUT")
            var option = document.createElement("option");
            option.value = form.conditionTypes[0];
            option.text = form.conditionTypes[0];
            selectType.appendChild(option);
        }
        else if (parentType == "Yes/No"){
            conditionInput = document.createElement("SELECT")
            conditionInput.setAttribute("name", "conditionSelect")
            var option = document.createElement("option");
            option.value = form.conditionTypes[0];
            option.text = form.conditionTypes[0];
            selectType.appendChild(option);
            var option1 = document.createElement("option");
            option1.value = "Yes"
            option1.text = "Yes"
            conditionInput.appendChild(option1)
            var option2 = document.createElement("option");
            option2.value = "No"
            option2.text = "No"
            conditionInput.appendChild(option2)

        }
        else{
            conditionInput = document.createElement("INPUT")
            conditionInput.setAttribute("name", "conditionInput")
            for (var i = 0; i < form.conditionTypes.length; i++) {
                var option = document.createElement("option");
                option.value = form.conditionTypes[i];
                option.text = form.conditionTypes[i];
                selectType.appendChild(option);
            }
        }
        var conditionClass = document.createElement('div')
        conditionClass.className = 'conditionClass'
        conditionClass.appendChild(selectType)
        conditionClass.appendChild(conditionInput)
        return conditionClass
    }       
    form.createTextClass = (strArray) =>{
        var textsClass = document.createElement('div')
        textsClass.className='textsClass'
        for(var i=0;i<strArray.length;i++){
            var text = document.createElement('p')
            text.innerHTML = strArray[i]
            textsClass.appendChild(text)
        }
        return textsClass
    }

    form.createInputsClass = (isParent, parentType) =>{

        var inputsClass = document.createElement('div')
        inputsClass.className='inputsClass'
        //Create an input element for Question
        var inputText = document.createElement("INPUT");
        inputText.setAttribute("type", "text");
        inputText.setAttribute("name","question")
        inputText.setAttribute("placeholder","Question")

        //Create a select element for Type of question
        var selectType = document.createElement("SELECT");
        selectType.id = "selectParentType"
        inputText.setAttribute("name","questionSelect")

        
        //Create and append the options
        for (var i = 0; i < form.types.length; i++) {
            var option = document.createElement("option");
            option.value = form.types[i];
            option.text = form.types[i];
            selectType.appendChild(option);
        }
        if(isParent==false){
            var conditionClass = form.createConditionClass(parentType)
            inputsClass.appendChild(conditionClass)
        }
        inputsClass.appendChild(inputText)
        inputsClass.appendChild(selectType)
        return inputsClass
    }
    form.addChild = e =>{
       
        var childInputClass = document.createElement('div')
        childInputClass.className = form.formChildClassName
        childInputClass.setAttribute("id", id)

        var parent = document.getElementById(e.target.id)
        var parentType = parent.querySelector("#selectParentType").value// Text, Number, Yes/No
        var margin = parseInt(window.getComputedStyle(parent.getElementsByClassName('container')[0]).marginLeft, 10)
        var textsClass = form.createTextClass(form.childText)
        var inputsClass = form.createInputsClass(false, parentType)
        var buttons = form.addButtonClass()
        
        var container = document.createElement('div')
        container.className = "container"
        container.appendChild(textsClass)
        container.appendChild(inputsClass)
        container.appendChild(buttons[0])
        container.appendChild(buttons[1])
        container.style.marginLeft=margin+20+'px'
        childInputClass.appendChild(container)
        parent.appendChild(childInputClass)  
        id+=1
    }
    form.remove = e =>{
       
        document.getElementById(e.target.id).remove()
    }
    form.addButtonClass = () => {
        var addChildButton = document.createElement('button')
        addChildButton.className = 'addChildButton'
        addChildButton.innerHTML= "+"
        addChildButton.setAttribute("id", id)

        var removeButton = document.createElement('button')
        removeButton.innerHTML= "-"
        removeButton.className = 'removeButton'
        removeButton.setAttribute("id", id)
        addChildButton.addEventListener('click', form.addChild);
        removeButton.addEventListener('click',form.remove)
        return ([addChildButton,removeButton])
        
    }

    form.addFormParentInput = () =>{
        console.log("hh");

        var parentInputClass = document.createElement('div')
        parentInputClass.className = form.formParentClassName
        parentInputClass.setAttribute("id", id)
        
        var container = document.createElement('div')
        container.className = "container"

        var textsClass = form.createTextClass(form.parentText)
        var inputsClass = form.createInputsClass(true)
        var buttons = form.addButtonClass()
        
        container.appendChild(textsClass)
        container.appendChild(inputsClass)
        container.appendChild(buttons[0])
        container.appendChild(buttons[1])
        
        parentInputClass.appendChild(container)
        form.formClass.appendChild(parentInputClass)
        id+=1
    }
    form.addFormParentInputOnClick = () =>{
        form.addFormParentInput()
        
    }
    return form
}



const formBuilderContainer = document.querySelector("formBuilder");
const buttonAdd =  document.querySelector("buttonAdd");
const buttonSend = document.querySelector("buttonSend");
var form = Form(formBuilderContainer,buttonAdd)

const formInputs = document.querySelector(".formInput")
document.querySelector('.buttonAdd').addEventListener('click', form.addFormParentInputOnClick);







// var fetchData = () => {
//     var parentTab = {}
//     var parentsClasses = document.getElementsByClassName("parentInputClass")
//     var numberOfParents = parentsClasses.length
//     for(var i=0; i<numberOfParents;i++){
//             parentTab[i]={}
//             parentTab[i].type = "Yes/No"
//             parentTab[i].question = "Do you?"
//             parentTab[i].childTab={}
//             var child = document.getElementsByClassName("parentInputClass")[i].querySelector(".childInputClass")
//             if(child!=null){
//                 findChild(parentTab[i].childTab, child, parentTab[i].type)
//                 //console.log(parentTab[i])
//             }
//     }
//    return parentTab
// }



// var childTab = [{
//     parentType:"",
//     conditionType:"",
//     conditionText:"",
//     question:"",
//     type:"",
//     childTab:childTab
// }]
// var parentTab = [{
//     question:"",
//     type:"",
//     childTab:childTab
// }]



var findChild = (tab, childClass, parentType) =>{
    var child = childClass.querySelector(".childInputClass")
    var amountOfChildren = 0
    if(tab == undefined){
        tab = {}
    }
   
    if(tab.childTab == undefined){
        tab.childTab = {}
    }
    
    if(child!=null){
        //parentTab[i].childTab={}
        findChild(tab.childTab[amountOfChildren], child, parentType)
        var nextChild = childClass.nextChild
        amountOfChildren+=1
        if(nextChild!=null){
            findChild(tab.childTab[amountOfChildren], nextChild, parentType)
        }
        else{
            tab.parentType = parentType
            tab.conditionType = "Equalms"
            tab.conditionText = "cztermy"
            tab.conditionText = "are youl?"
            tab.type = "yes/nol"
            // var sibiling = tab.nextSibling
            // if(sibiling!=null){

            //     findChild(tab[Object.keys(tab.childTab).length].childTab[tab.childTab.length], sibiling, parentType)
            // }
        }
    }
    else{
        tab.parentType = parentType
        tab.conditionType = "Equals"
        tab.conditionText = "cztery"
        tab.conditionText = "are you?"
        tab.type = "yes/no"
        tab.childTab = null
        
    }
    console.log(tab)
}







formInputs.addEventListener('submit', function (e){
    var formData = document.querySelector("form")
var data = new FormData(formData)
console.log("dsgsggw")
console.log(data.data)
console.log("dsgsggw")
    e.preventDefault();
    var parentTab = {}
    var parentsClasses = document.getElementsByClassName("parentInputClass")
    var numberOfParents = parentsClasses.length
    for(var i=0; i<numberOfParents;i++){
            parentTab[i]={}
            parentTab[i].type = "Yes/No"
            parentTab[i].question = "Do you?"
            parentTab[i].childTab={}
            var child = document.getElementsByClassName("parentInputClass")[i].querySelector(".childInputClass")
            var amountOfChildren = 0
            while(child!=null){
                parentTab[i].childTab[amountOfChildren] = {}
                findChild(parentTab[i].childTab[amountOfChildren], child, parentTab[i].type)
                child = child.nextSibling
                amountOfChildren+=1
                //console.log(parentTab[i])
            }
    }
    console.log(parentTab)

});
