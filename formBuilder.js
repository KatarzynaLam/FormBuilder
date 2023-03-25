var Form = function(buttonAdd){
 
    let form={
        types: ["Text", "Number", "Yes/No"],
        parentText:["Question", "Types"],
        childText:["Condition","Question", "Types"],
        conditionTypes: ["Equals", "Greater than", "Less than"],
        buttonAddParentInput: buttonAdd,
        formClass: document.getElementsByClassName("formInput")[0],
        formParentClassName: "parentInputClass",
        formChildClassName: "childInputClass",
    }
    var id = 0
    
    form.remove = e =>{
        e.preventDefault();
        document.getElementById(e.target.id).remove()
    }

    form.createConditionClass = (parentType) =>{
        //Create a select for condition in sub-inputs
        var selectType = document.createElement("SELECT");
        selectType.id = "selectConditionType"
        selectType.setAttribute("name", "selectConditionType")
        var conditionInput = null

        if(parentType == "Text"){

            //Create an input for text type condition in sub-inputs
            conditionInput = document.createElement("INPUT")
            conditionInput.id = "conditionInput"
            conditionInput.setAttribute("placeholder"," Text")

            //Create an option for condition select in sub-inputs
            var option = document.createElement("option");
            option.value = form.conditionTypes[0];
            option.text = form.conditionTypes[0];
            selectType.appendChild(option);
        }
        else if (parentType == "Yes/No"){

            //Create a button for adding sub-inputs
            conditionInput = document.createElement("SELECT")
            conditionInput.setAttribute("name", "conditionSelect")
            conditionInput.id = "conditionSelect"
            
            //Create options for condition select in sub-inputs
            var option = document.createElement("option");
            option.value = form.conditionTypes[0];
            option.text = form.conditionTypes[0];
            selectType.appendChild(option);

            //Create options for Yes/No condition select in sub-inputs
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
            //Create an input for number type condition in sub-inputs
            conditionInput = document.createElement("INPUT")
            conditionInput.setAttribute("name", "conditionInput")
            conditionInput.id = "conditionInput"
            conditionInput.setAttribute("placeholder"," Number")

            //Create options for condition select in sub-inputs
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

    form.addButtonClass = () => {
        //Create a button for adding sub-inputs
        var addChildButton = document.createElement('button')
        addChildButton.className = 'addChildButton'
        addChildButton.innerHTML= "+"
        addChildButton.setAttribute("id", id)

        //Create a button for removing branch
        var removeButton = document.createElement('button')
        removeButton.innerHTML= "-"
        removeButton.className = 'removeButton'
        removeButton.setAttribute("id", id)
        addChildButton.addEventListener('click', form.addChild);
        removeButton.addEventListener('click',form.remove)
        return ([addChildButton,removeButton])   
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
        //Adding conditions for sub-inputs
        if(isParent==false){
            var conditionClass = form.createConditionClass(parentType)
            inputsClass.appendChild(conditionClass)
        }
        inputsClass.appendChild(inputText)
        inputsClass.appendChild(selectType)
        return inputsClass
    }

    //Creates text "Condition, Question, Type"
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

    //Creates parent input
    form.addFormParentInput = () =>{
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

    //Creates sub-input
    form.addChild = e =>{
        e.preventDefault();
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

    form.addFormParentInputOnClick = () =>{

        form.addFormParentInput()
    }
    return form
}

const buttonAdd =  document.querySelector("buttonAdd");
var form = Form(buttonAdd)
document.querySelector('.buttonAdd').addEventListener('click', form.addFormParentInputOnClick);

