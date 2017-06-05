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
            var request = indexedDB.open(DATABASE_NAME, 1);

            request.onupgradeneeded = function (e) {
                var active = request.result;
                console.log('on upgrade needed', active);

                var dexStore = active.createObjectStore("dex", {keyPath: 'id'});
                dexStore.createIndex('byNum', 'num', {unique: false});
                dexStore.createIndex('byType', 'types', {unique: false, multiEntry: true});
                dexStore.createIndex('byEggGroup', 'eggGroups', {unique: false, multiEntry: true});
                dexStore.createIndex('byAbility', 'abilities_', {unique: false, multiEntry: true});

                var abStore = active.createObjectStore("dex_ability", {keyPath: 'num'});
                abStore.createIndex('byName', 'name', {unique: false});
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
                    if (result !== undefined) {
                        deferred.resolve(result);
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
                    if (result !== undefined) {
                        deferred.resolve(result);
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
    }

})();