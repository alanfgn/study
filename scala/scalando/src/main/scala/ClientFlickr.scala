package alan.dev

import java.util.Properties

object ClientFlickr extends App {
  val props = new Properties()
  props.load(getClass.getClassLoader.getResourceAsStream("config.properties"))

  val apiKey = props.getProperty("flickr.api.key")
  val method = "flickr.photos.search"
  val tags = "scala"

  val url = s"https://api.flickr.com/services/rest/?method=$method&api_key=$apiKey&tags=$tags"

  scala.io.Source.fromURL(url).getLines().foreach(println)
}