SET pg.log_duration = '10000';

DO $$
DECLARE
  log_duration VARCHAR := current_setting('pg.log_duration');
BEGIN
  -- Check for rds parameter group shared_preload_libraries
  IF ( SELECT POSITION('rdsaudit' IN current_setting('shared_preload_libraries')) = 0 ) THEN
    RAISE NOTICE 'Please set parameter group value for shared_preload_libraries to rdsaudit';
  END IF;

  -- Check for pg_audit role in the db
  IF (SELECT 1 FROM pg_roles WHERE rolname = 'rds_audit') THEN
    RAISE NOTICE 'Role - rds_audit already exists';
  ELSE
    CREATE ROLE rds_audit;
  END IF;

  -- Set audit param at db level
  ALTER DATABASE postgres set pgaudit.log='DDL, ROLE';
  EXECUTE FORMAT('ALTER DATABASE postgres SET log_min_duration_statement = %s;', log_duration);
END;
$$
