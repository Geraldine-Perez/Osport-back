# Users

| Champ|Type | Spécificités | Description |
|---|---|---|---|
| id | INT | GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY |Identifiant de l’utilisateur |
|email|VARCHAR(127)|NOT NULL|Mail de l’utilisateur|
|is_admin|BOOLEAN|NOT NULL, DEFAULT FALSE|Profil administrateur ou utilisateur|
|user_name|VARCHAR(32)|NOT NULL|Pseudo de l’utilisateur|
|password|VARCHAR (128)|NOT NULL|Mot de passe de l’utilisateur|
|lastname|VARCHAR (64)|NOT NULL|Nom|
|firstname|VARCHAR (64)|NOT NULL|Prénom|
|region|VARCHAR (64)|NOT NULL|Région|
|zipcode|INTEGER NOT NULL|NOT NULL|Code postal|
|city|VARCHAR (64)|NOT NULL|Ville|
|street|VARCHAR (255)|---|Rue|
|description|VARCHAR (255)|---|Descriptif de la sortie|
|created_at|TIMESTAMPTZ |NOT NULL DEFAULT NOW()|Date de création de l’utilisateur|
|updated_at|TIMESTAMPTZ |---|date de modification|

# Events

| Champ|Type | Spécificités | Description |
|---|---|---|---|
| id | INT | GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY |Identifiant de l'événement sportif|
|creator_id|INT|NOT NULL REFERENCES "users"("id")|Identifiant du créateur de l'événement|
|sport_id|INT|NOT NULL REFERENCES "sports"("id")|Identifiant du sport associé à l'évènement|
|title|VARCHAR (64)|NOT NULL|Titre de l’événement|
|region|VARCHAR (64)|NOT NULL|Région|
|zipcode|INT|NOT NULL|Code postal|
|city|VARCHAR (64)|NOT NULL|Ville|
|street|VARCHAR (255)|NOT NULL|Rue|
|description|VARCHAR (500)|---|Description de l'évènement sportif|
|starting_time|TIMESTAMPTZ |NOT NULL|Date/heure du début de l'événement|
|ending_time|TIMESTAMPTZ |NOT NULL|Date/heure de la fin de l’évènement|
|created_at|TIMESTAMPTZ |NOT NULL DEFAULT NOW()|Date de création de la sortie|
|updated_at|TIMESTAMPTZ |---|Date de modification de la sortie|

# Sports

| Champ|Type | Spécificités | Description |
|---|---|---|---|
| id | INT | GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY | Id du sport |
|name|VARCHAR (32)|NOT NULL|Nom du sport|

# users_join_events

| Champ|Type | Spécificités | Description |
|---|---|---|---|
|event_id|INT|NOT NULL REFERENCES "events"("id")|Id des évènements auxquels l'utilisateur participe|
|user_id|INT|NOT NULL REFERENCES "users"("id")|Id des utilisateurs qui participent au même évènement|

# users_like_sports

| Champ|Type | Spécificités | Description |
|---|---|---|---|
|user_id|INT|NOT NULL REFERENCES "users"("id")|Id de l'utilisateur associé à un sport favori|
|sport_id|INT|NOT NULL REFERENCES "sports"("id")|Id du sport favori|