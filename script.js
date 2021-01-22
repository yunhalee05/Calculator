class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){ /*AC 버튼 눌렀을 때*/
        this.currentOperand = ''
        this.previousOperand = ''
        this.poreation = undefined
    }

    delete(){/*del 버튼 눌렀을 때*/
        this.currentOperand = this.currentOperand.toString().slice(0, -1) /*한자리 삭제(가장 최근것을 삭제) */
    }

    appendNumber(number){/* 숫자버튼 눌렀을 때*/
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){ /* 수식기호 버튼 눌렀을 때*/
        if(this.currentOperand ==='') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation 
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute(){/* = 버튼 눌렀을 때*/
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(current)) return /*숫자가 아니면 계산하지 않는다. (빈칸인데 =누른다고 계산하지 않는다.) */
        switch(this.operation){
            case '+' : 
                computation = prev + current
                break
            case '-' : 
                computation = prev - current
                break
            case '*' : 
                computation = prev * current
                break
            case '÷' : 
                computation = prev / current
                break

            default : 
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number){ /*숫자가 여러개 눌릴때 숫자를 어떻게 보일지 설정*/
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) /* . 기준으로 앞에거 저장*/
        const decimalDigits = stringNumber.split('.')[1] /* .기준으로 뒤의 것 저장 */
        let integerDisplay
        if(isNaN(integerDigits)) {/*인티저자리는 en을 통해서 3자리마다 , 뜨도록 설정*/
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{ 
                maximumFractionDigits: 0})
        }
        if(decimalDigits !=null){/*소숫점자리는 ,붙지 않도록 설정*/
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }

    }

    updateDisplay(){/* 화면에 어떻게 보일 지 설정한다.*/
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) { /*수식기호가 있다면 계산한 값을 previousOperand에 보이도록 한다.*/
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(previousOperand)} ${this.operation}`
        } else{/*없으면 current창만 뜨도록 설정  */
            this.previousOperandTextElement.innerText = ''

        }
    }
}





const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalsButton=document.querySelector('[data-equals]')
const deleteButton=document.querySelector('[data-delete]')
const allClearButton=document.querySelector('[data-all-clear]')
const previousOperandTextElement=document.querySelector('[data-previous-operand]')
const currentOperandTextElement=document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)


/*각 버튼을 클릭했을때 어떻게 작동할 것인지 설정 */
numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click' , button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click' , button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click' , button =>{
    calculator.delete()
    calculator.updateDisplay()
})

