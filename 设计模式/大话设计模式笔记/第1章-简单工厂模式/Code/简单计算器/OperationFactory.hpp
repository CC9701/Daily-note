#ifndef _OPERATIONFACTORY_HPP_
#define _OPERATIONFACTORY_HPP_

#include <string>
#include "Operation.hpp"
#include "OperationDerived.hpp"

class OperationFactory {
public:
    static Operation* createOperate(const std::string& operate) {
        Operation* oper = nullptr;

        if (operate == "+") {
            oper = new OperationAdd();
        } else if(operate == "-"){
            oper = new OperationSub();
        } else if (operate == "*") {
            oper = new OperationMul();
        } else if (operate == "/") {
            oper = new OperationDiv();
        }
        return oper;
    }

};

#endif // !_OPERATIONFACTORY_HPP_

