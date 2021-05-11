#ifndef _OPERATION_HPP_
#define _OPERATION_HPP_


class Operation {
protected:
    double _numberA = 0;
    double _numberB = 0;
public:
    double getNumberA() {
        return _numberA;
    }
    void setNumberA(double value) {
        _numberA = value;
    }

    double getNumberB() {
        return _numberB;
    }
    void setNumberB(double value) {
        _numberB = value;
    }

    virtual double getResult() {
        double result = 0;
        return result;
    }
};
#endif // !_OPERATION_HPP_

