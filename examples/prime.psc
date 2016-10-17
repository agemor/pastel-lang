# 자연수 n이 소수인지 판별하는 프로그램
(define check n c (
    (if (< (square n) (prime c)) (true)
        ((if (zero (modular n (prime c))) (false)
             (check n (+ c 1)))))
))

# n번째 소수를 계산하는 프로그램
(define prime n (
    (if (= n 1) (2)
        (define search r (
            (if (check r 1) (r) (search (+ r 1)))))
        (memoize search (+ (prime (- n 1)) 1)))
))