-- +migrate Up
CREATE TABLE ux_fact_media (
    id BIGINT NOT NULL AUTO_INCREMENT,
    reference_id BIGINT NOT NULL,
    reference_type ENUM('showcase', 'project'),
    media_type ENUM('image', 'video', 'short_video'),
    media_link VARCHAR(512),
    media_caption TEXT,
    PRIMARY KEY(id)
);
        