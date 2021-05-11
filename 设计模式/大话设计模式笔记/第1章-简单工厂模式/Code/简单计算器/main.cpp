#include <iostream>
#include "Operation.hpp"
#include "OperationDerived.hpp"
#include "OperationFactory.hpp"

using namespace std;
void main() {
    Operation* oper;
    oper = OperationFactory::createOperate("+");
    oper->setNumberA(2.0);
    oper->setNumberB(1.0);
    cout << "Result = " << oper->getResult() << endl;
}