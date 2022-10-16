create schema pessoa;

create table pessoa.post(
    id serial primary key,
    nome text not null,
    content text not null,
    date timestamp default now()
);
