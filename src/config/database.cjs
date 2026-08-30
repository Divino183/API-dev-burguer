module.exports = {
    username: 'admin',
    password: '123456',
    database: 'dev-burguer-db',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432 , // quando o valor da porta não é o padrão, é necessário informar, mais se for 5432 que é o padrão, não é necessário informar
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};