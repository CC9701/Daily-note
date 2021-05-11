#ifndef _OPERATIONDERIVED_HPP_
#define _OPERATIONDERIVED_HPP_
#include "Operation.hpp"

class OperationAdd : public Operation{
    virtual double getResult() {
        double result = 0;
        return _numberA + _numberB;
    }
};

class OperationSub : public Operation {
    virtual double getResult() {
        double result = 0;
        return _numberA - _numberB;
    }
};
class OperationMul : public Operation {
    virtual double getResult() {
        double result = 0;
        return _numberA * _numberB;
    }
};
class OperationDiv : public Operation {
    virtual double getResult() {
        double result = 0;
        return _numberA / _numberB;
    }
};
#endif // !_OPERATIONDERIVED_HPP_


