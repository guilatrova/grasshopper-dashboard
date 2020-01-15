const selectListItems = (results) => results.Items
    .map(x => ({ datetime: Number(x.datetime.N), title: x.title ? x.title.S : "Untitled" }))
    .sort((a, b) => b.datetime - a.datetime);

module.exports = {
    selectListItems
}
