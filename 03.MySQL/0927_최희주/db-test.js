const dm = require('./db-module');

dm.girlGroupList(rows => {
    for (let row of rows) {
        console.log(row.gid, row.name, row.debutDate, row.title);
    }
});

dm.songList(rows => {
    for (let row of rows) {
        console.log(row.sid, row.title, row.lyrics, row.name);
    }
});


dm.getGirlGroup(1013, rows => {
    for (let row of rows) {
        console.log(row.gid, row.name, row.debutDate, row.title);
    }
});

dm.getSong(103, rows => {
    for (let row of rows) {
        console.log(row.sid, row.title, row.lyrics, row.name);
    }
});

dm.insertGirlGroup([1200,'아이브','2021-12-01',122], () => {         
    dm.getAllGirlGroup(rows => {
        for (let row of rows) {
            console.log(row.gid, row.name, row.debutDate, row.hit_song_id);
        }
    })   
});

dm.updateGirlGroup(['엔믹스','2022-02-22',500,1200], () => {         
    dm.getAllGirlGroup(rows => {
        for (let row of rows) {
            console.log(row.gid, row.name, row.debutDate, row.hit_song_id);
        }
    })   
});

dm.deleteGirlGroup(1023, () => {         
    dm.getAllGirlGroup(rows => {
        for (let row of rows) {
            console.log(row.gid, row.name, row.debutDate, row.hit_song_id);
        }
    })   
});


dm.insertSong([125,'Eleven','따분한 나의 눈빛이'], () => {         
    dm.getAllSong(rows => {
        for (let row of rows) {
            console.log(row.sid, row.title, row.lyrics);
        }
    })   
});

dm.updateSong(['Dice','Dice yeah',120], () => {         
    dm.getAllSong(rows => {
        for (let row of rows) {
            console.log(row.sid, row.title, row.lyrics);
        }
    })   
});

dm.deleteSong(120, () => {         
    dm.getAllSong(rows => {
        for (let row of rows) {
            console.log(row.sid, row.title, row.lyrics);
        }
    })   
});
