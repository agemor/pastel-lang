# n!을 계산하는 프로그램   
(define factorial n (
    (if (< n 2) (1) 
        (* n (factorial (- n 1))))
)) 