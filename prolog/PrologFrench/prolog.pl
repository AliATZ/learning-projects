% Facts
x1(ali).
y1(bad).
z1(nice).
v1(well).

% Rule for creating a sentence
hello(A, B, C, D) :-
    (x1(A); y1(B)),
    (z1(C); v1(D)),
    Sentence = [A, B, C, D],
    write(Sentence).
