
article(le, masculin, singular).
article(la, feminin, singular).
article(les, _, plural).
article(un, masculin, singular).
article(une, feminin, singular).
article(des, _, plural).
noun(garcon, masculin, singular).
noun(fille, feminin, singular).
noun(chiens, masculin, plural).
noun(chats, masculin, plural).
noun(homme, masculin, singular).
noun(femme, feminin, singular).
noun(oiseaux, masculin, plural).
noun(voiture, feminin, singular).
verb(mange, singular).
verb(mangent, plural).
verb(boit, singular).
verb(boivent, plural).
verb(court, singular).
verb(courent, plural).
adjective(grand, masculin, singular).
adjective(grande, feminin, singular).
adjective(grands, masculin, plural).
adjective(grandes, feminin, plural).
adjective(petit, masculin, singular).
adjective(petite, feminin, singular).
adjective(petits, masculin, plural).
adjective(petites, feminin, plural).

% Construct a sentence
sentence(Article, Noun, Verb, Adjective) :-
    article(Article, Gender, Number),
    noun(Noun, Gender, Number),
    verb(Verb, Number),
    adjective(Adjective, Gender, Number).

% Generate a sentence
generate_sentence(Sentence) :-
    sentence(Article, Noun, Verb, Adjective),
    atomic_list_concat([Article, Noun, Verb, Adjective], ' ', Sentence).

% Example query:
% ?- generate_sentence(Sentence).


