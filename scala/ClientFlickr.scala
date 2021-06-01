object ClientFlickr extends App {
    val props = new Properties()
    props.load(getClass.getClassLoader.getResourceAsStream("./config.properties"))

    val apiKey = "99775209207bd907c05bf5c63e759dad"
    val method = "flickr.photos.search"
    val tags = "scala"

    val url = s"https://api.flickr.com/services/rest/?method=$method&api_key=$apiKey&tags=$tags"

    scala.io.Source.fromURL(url).getLines().foreach(println)

}