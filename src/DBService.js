(function ()
{
    'use strict';
    angular
            .module('app')
            .service('DBService', DatabaseService);

    function DatabaseService($q, $window) {

        var service = this;
        console.log(service);

        var DATABASE_NAME = "myApp";
        var indexedDB = $window.indexedDB;
        service.db = null;

        service.open = function () {
            var deferred = $q.defer();
            var request = indexedDB.open(DATABASE_NAME, 2);

            request.onupgradeneeded = function (e) {
                var active = request.result;
                console.log('on upgrade needed', active);

                /* ------------------------ */
                var dexStore = !active.objectStoreNames.contains('dex')
                        ? active.createObjectStore("dex", {keyPath: 'id'})
                        : e.target.transaction.objectStore('dex');

                if (!dexStore.indexNames.contains('byNum'))
                    dexStore.createIndex('byNum', 'num', {unique: false});
                if (!dexStore.indexNames.contains('byType'))
                    dexStore.createIndex('byType', 'types', {unique: false, multiEntry: true});
                if (!dexStore.indexNames.contains('byEggGroup'))
                    dexStore.createIndex('byEggGroup', 'eggGroups', {unique: false, multiEntry: true});
                if (!dexStore.indexNames.contains('byAbility'))
                    dexStore.createIndex('byAbility', 'abilities_', {unique: false, multiEntry: true});

                /* ------------------------ */
                var abStore = !active.objectStoreNames.contains('dex_ability')
                        ? active.createObjectStore("dex_ability", {keyPath: 'num'})
                        : e.target.transaction.objectStore('dex_ability');

                if (!abStore.indexNames.contains('byName'))
                    abStore.createIndex('byName', 'name', {unique: false});

                /* ------------------------ */
                var movStore = !active.objectStoreNames.contains('dex_moves')
                        ? active.createObjectStore("dex_moves", {keyPath: 'id'})
                        : e.target.transaction.objectStore('dex_moves');

                if (!movStore.indexNames.contains('byType'))
                    movStore.createIndex('byType', 'type', {unique: false});
            };

            request.onsuccess = function (e) {
                service.db = e.target.result;
                deferred.resolve();
            };

            request.onerror = function (e) {
                console.error('Error cargando BBDD');
                deferred.reject();
            };

            return deferred.promise;
        };

        service.add = function (obj, table_name) {
            var deferred = $q.defer();

            if (service.db === null) {
                deferred.reject("Base de datos sin iniciar, usa DBService.open()");
            } else {
                var trans = service.db.transaction([table_name], "readwrite");
                var store = trans.objectStore(table_name);

                var request = store.put(obj);//nombre columna / valor

                request.onsuccess = function (e) {
                    deferred.resolve(obj);
                };

                request.onerror = function (e) {
                    console.log(e.value);
                    deferred.reject("Fallo al añadir/actualizar el objeto " + angular.toJson(obj));
                };
            }
            return deferred.promise;
        };

        service.get = function (table_name, id) {
            var deferred = $q.defer();

            if (service.db === null) {
                deferred.reject("Base de datos sin iniciar, usa DBService.open()");
            } else {
                var trans = service.db.transaction([table_name], "readonly");
                var object = trans.objectStore(table_name);

                var request = object.get(id);

                request.onsuccess = function () {
                    var result = request.result;
                    if (result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("No encontrado");
                    }
                };

                request.onerror = function (e) {
                    console.log(e.value);
                    deferred.reject("Fallo al obtener el id " + id);
                };
            }
            return deferred.promise;
        };

        service.getAll = function (table_name) {
            var deferred = $q.defer();

            if (service.db === null) {
                deferred.reject("Base de datos sin iniciar, usa DBService.open()");
            } else {
                var trans = service.db.transaction([table_name], "readonly");
                var store = trans.objectStore(table_name);

                // Get everything in the store;
                var request = store.getAll();

                request.onsuccess = function (e) {
                    var result = request.result;
                    if (result.length) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("No encontrado");
                    }
                };

                request.onerror = function (e) {
                    console.log(e.value);
                    deferred.reject("Fallo al obtener datos");
                };
            }

            return deferred.promise;
        };

        service.getAllByIndex = function (table_name, idx_name, search) {
            var deferred = $q.defer();

            if (service.db === null) {
                deferred.reject("Base de datos sin iniciar, usa DBService.open()");
            } else {
                var trans = service.db.transaction([table_name], "readonly");
                var store = trans.objectStore(table_name);
                var index = store.index(idx_name);

                // Get everything in the store;
                var request = index.getAll(search);

                request.onsuccess = function (e) {
                    var result = request.result;
                    if (result.length) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("No encontrado");
                    }
                };

                request.onerror = function (e) {
                    console.log(e.value);
                    deferred.reject("Fallo al obtener datos");
                };
            }

            return deferred.promise;
        };

        service.delete = function (table_name, id) {
            var deferred = $q.defer();

            if (service.db === null) {
                deferred.reject("Base de datos sin iniciar, usa DBService.open()");
            } else {
                var trans = service.db.transaction([table_name], "readwrite");
                var store = trans.objectStore(table_name);

                var request = store.delete(id);

                request.onsuccess = function (e) {
                    deferred.resolve();
                };

                request.onerror = function (e) {
                    console.log(e.value);
                    deferred.reject("Fallo al eliminar el id " + id);
                };
            }

            return deferred.promise;
        };

        service.clear = function (table_name) {
            var deferred = $q.defer();

            if (service.db === null) {
                deferred.reject("Base de datos sin iniciar, usa DBService.open()");
            } else {
                var trans = service.db.transaction([table_name], "readwrite");
                var store = trans.objectStore(table_name);

                var request = store.clear();

                request.onsuccess = function (e) {
                    deferred.resolve();
                };

                request.onerror = function (e) {
                    console.log(e.value);
                    deferred.reject("Fallo al limpiar tabla");
                };
            }

            return deferred.promise;
        };

        service.count = function (table_name) {
            var deferred = $q.defer();

            if (service.db === null) {
                deferred.reject("Base de datos sin iniciar, usa DBService.open()");
            } else {
                var trans = service.db.transaction([table_name], "readonly");
                var store = trans.objectStore(table_name);

                var request = store.count();

                request.onsuccess = function (e) {
                    deferred.resolve(request.result);
                };

                request.onerror = function (e) {
                    console.log(e.value);
                    deferred.reject("Fallo al obtener tamaño");
                };
            }

            return deferred.promise;
        };

        service.deleteDatabase = function () {
            indexedDB.deleteDatabase(DATABASE_NAME);
        };

        service.getDbInfo = function () {
            var db = service.db;
            return{
                name: db.name,
                objectStoreNames: toArray(db.objectStoreNames).map(function (storeName) {
                    var store = db.transaction([storeName], 'readonly').objectStore(storeName);
                    return {
                        name: store.name,
                        indexNames: toArray(store.indexNames)
                    };
                })
            };

            function toArray(obj) {
                var array = [];
                // iterate backwards ensuring that length is an UInt32
                for (var i = obj.length >>> 0; i--; ) {
                    array[i] = obj[i];
                }
                return array;
            }
        };
    }

})();