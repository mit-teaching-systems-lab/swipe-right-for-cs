--- Summary of all cohorts, with how many workshops and identifiers in each:
SELECT
  session->'cohortNumber' as cohort_number,
  array_agg(DISTINCT session->>'workshopCode') as workshop_codes,
  -- array_to_string(array_agg(DISTINCT session->>'identifier'), ', ') as identifiers,
  COUNT(distinct session->>'identifier') as identifier_count,
  COUNT(*) as interactions_count,
  CONCAT(MIN(timestampz),' - ', MAX(timestampz)) as time_range
FROM interactions
WHERE 1=1
  AND session->>'workshopCode' NOT LIKE 'DEMO%'
  AND session->>'workshopCode' NOT IN ('foo', 'demo', 'code.org')
  AND session->>'identifier' NOT IN ('UNKNOWN_IDENTIFIER', '', 'kevin')
GROUP BY cohort_number
ORDER BY cohort_number ASC, identifier_count DESC;


--- show me workshops and how many people:
SELECT
  session->'workshopCode' as workshop_code,
  count(distinct session->>'identifier') as identifier_count,
  count(*) as interactions_count,
  EXTRACT(epoch from (MAX(timestampz) - MIN(timestampz))) /60 as minutes,
  CONCAT(MIN(timestampz),' - ', MAX(timestampz)) as time_range
FROM interactions
WHERE 1=1
  AND session->>'workshopCode' NOT LIKE 'DEMO%'
  AND session->>'workshopCode' NOT IN ('foo', 'demo', 'code.org')
  AND session->>'identifier' NOT IN ('UNKNOWN_IDENTIFIER', '', 'kevin')
GROUP BY workshop_code
ORDER BY identifier_count DESC, workshop_code ASC;



--- how many code.org identifiers?
SELECT
  session->>'identifier' as identifier
FROM interactions
WHERE 1=1
  AND session->>'workshopCode' NOT IN ('foo', 'demo', 'code.org')
  AND session->>'identifier' NOT IN ('UNKNOWN_IDENTIFIER', '', 'kevin')
GROUP BY identifier;

--- how many sessions for unknown identifiers?
SELECT
  session->>'identifier' as identifier,
  session->>'sessionId' as session_id,
  count(*) as interaction_count
FROM interactions
WHERE 1=1
  AND session->>'identifier' = 'UNKNOWN_IDENTIFIER'
GROUP BY identifier, session_id
ORDER BY interaction_count DESC;


--- show me an individual session (or identifier)
SELECT * FROM interactions where session->>'sessionId' = 'xyz';


--- how many code.org gave consent versus declined?
SELECT count(*) as declined FROM interactions
where 1=1
  AND session->>'identifier' NOT IN ('UNKNOWN_IDENTIFIER', '', 'kevin')
  AND interaction->>'type' = 'GAVE_CONSENT:nQddiko2aPPOfmKy8pC3r//eBr82OzD9smVMJPdUZRo=';

SELECT count(*) as declined FROM interactions
where 1=1
  AND session->>'identifier' NOT IN ('UNKNOWN_IDENTIFIER', '', 'kevin')
  AND interaction->>'type' LIKE '%CONSENT%';

SELECT count(*) as declined FROM interactions
where 1=1
  AND session->>'identifier' NOT IN ('UNKNOWN_IDENTIFIER', '', 'kevin')
  AND interaction->>'type' = 'DECLINED_CONSENT:96D+jgR6SglT5cPrdtiLk9oY2FScLr5eMFTwBpISylU=';


--- consent overall?
SELECT count(*) FROM interactions where interaction->>'type' LIKE '%CONSENT%';
SELECT count(*) as declined FROM interactions where interaction->>'type' = 'GAVE_CONSENT:nQddiko2aPPOfmKy8pC3r//eBr82OzD9smVMJPdUZRo=';



SELECT * FROM interactions ORDER BY id ASC;