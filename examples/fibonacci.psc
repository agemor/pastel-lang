# 피보나치 수열의 n항을 계산하는 프로그램
(define fibonacci n (
    (if (= n 0) (0)
    (if (= n 1) (1))
    (+ (fibonacci (- n 1)) (memoize fibonacci (- n 2))))
))