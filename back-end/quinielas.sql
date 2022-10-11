\echo 'Delete and recreate quinielas db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE quinielas;
CREATE DATABASE quinielas;
\connect quinielas

\i quinielas-schema.sql

\echo 'Delete and recreate quinielas_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE quinielas_test;
CREATE DATABASE quinielas_test;
\connect quinielas_test

\i quinielas-schema.sql